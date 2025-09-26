import { RefObject, useCallback, useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import { useStore } from '@/store';

// Configuration for sensitivity and timing
const SLOUCH_THRESHOLD = 15;
const HEAD_TILT_THRESHOLD = 10;
const SHOULDER_LEVEL_THRESHOLD = 15;
const GRACE_PERIOD_MS = 2000;

// Map issues to exercises
const exerciseMap: { [key: string]: string } = {
  "Slouching Detected": "Try the 'Chest Opener' stretch to correct your posture.",
  "Head Tilted": "Perform 'Neck Tilts' to align your head properly.",
  "Uneven Shoulders": "Practice 'Shoulder Rolls' to level your shoulders."
};

const usePostureDetection = (videoRef: RefObject<HTMLVideoElement>, canvasRef: RefObject<HTMLCanvasElement>) => {
  const { setPostureIssues, addPostureData } = useStore.getState();
  const detectorRef = useRef<poseDetection.PoseDetector | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const badPostureStartTime = useRef<number | null>(null);

  const analyzePosture = (keypoints: poseDetection.Keypoint[]) => {
      const issues: string[] = [];
      const problematicKeypoints: string[] = [];

      const nose = keypoints.find(k => k.name === 'nose');
      const leftShoulder = keypoints.find(k => k.name === 'left_shoulder');
      const rightShoulder = keypoints.find(k => k.name === 'right_shoulder');
      const leftEar = keypoints.find(k => k.name === 'left_ear');
      const rightEar = keypoints.find(k => k.name === 'right_ear');

      // 1. Check for Slouching
      if (nose && leftShoulder && rightShoulder && (leftShoulder.score ?? 0) > 0.5 && (rightShoulder.score ?? 0) > 0.5) {
          const shoulderMidpointY = (leftShoulder.y + rightShoulder.y) / 2;
          if (nose.y > shoulderMidpointY + SLOUCH_THRESHOLD) {
              issues.push("Slouching Detected");
              problematicKeypoints.push('nose', 'left_shoulder', 'right_shoulder');
          }
      }

      // 2. Check for Head Tilt
      if (leftEar && rightEar && (leftEar.score ?? 0) > 0.5 && (rightEar.score ?? 0) > 0.5) {
          if (Math.abs(leftEar.y - rightEar.y) > HEAD_TILT_THRESHOLD) {
              issues.push("Head Tilted");
              problematicKeypoints.push('left_ear', 'right_ear');
          }
      }

      // 3. Check for Uneven Shoulders
      if (leftShoulder && rightShoulder && (leftShoulder.score ?? 0) > 0.5 && (rightShoulder.score ?? 0) > 0.5) {
          if (Math.abs(leftShoulder.y - rightShoulder.y) > SHOULDER_LEVEL_THRESHOLD) {
              issues.push("Uneven Shoulders");
              problematicKeypoints.push('left_shoulder', 'right_shoulder');
          }
      }

      return { issues, problematicKeypoints: [...new Set(problematicKeypoints)] };
  };

  const drawPose = (pose: poseDetection.Pose, problematicKeypoints: string[]) => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !canvasRef.current) return;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      pose.keypoints.forEach(keypoint => {
          // --- THIS LINE IS THE FIX ---
          // We add `&& keypoint.name` to ensure the name exists before using it.
          if ((keypoint.score ?? 0) > 0.5 && keypoint.name) {
              const isProblematic = problematicKeypoints.includes(keypoint.name);
              ctx.beginPath();
              ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
              ctx.fillStyle = isProblematic ? 'red' : 'aqua';
              ctx.fill();
          }
      });
  };

  const detect = useCallback(async () => {
      if (videoRef.current && detectorRef.current && videoRef.current.readyState === 4) {
          const poses = await detectorRef.current.estimatePoses(videoRef.current);

          if (poses.length > 0) {
              const { issues, problematicKeypoints } = analyzePosture(poses[0].keypoints);
              drawPose(poses[0], problematicKeypoints);

              if (issues.length > 0) {
                  if (badPostureStartTime.current === null) {
                      badPostureStartTime.current = Date.now();
                  } else {
                      const duration = Date.now() - badPostureStartTime.current;
                      if (duration >= GRACE_PERIOD_MS) {
                          const exercise = exerciseMap[issues[0]] || null;
                          setPostureIssues(issues, exercise);
                      }
                  }
                  addPostureData({ time: new Date().toLocaleTimeString(), score: 0 });

              } else {
                  badPostureStartTime.current = null;
                  setPostureIssues([], null);
                  addPostureData({ time: new Date().toLocaleTimeString(), score: 1 });
              }
          }
      }
      animationFrameId.current = requestAnimationFrame(detect);
  }, [videoRef, canvasRef, addPostureData, setPostureIssues]);


  const startPostureDetection = useCallback(async () => {
      await tf.ready();
      await tf.setBackend('webgl');
      const model = poseDetection.SupportedModels.MoveNet;
      const detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING
      };
      detectorRef.current = await poseDetection.createDetector(model, detectorConfig);
      detect();
  }, [detect]);

  const stopPostureDetection = useCallback(() => {
      if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
      }
      if (detectorRef.current) {
          detectorRef.current.dispose();
          detectorRef.current = null;
      }
      badPostureStartTime.current = null;
      setPostureIssues([], null);
  }, [setPostureIssues]);

  return { startPostureDetection, stopPostureDetection };
};

export default usePostureDetection;

