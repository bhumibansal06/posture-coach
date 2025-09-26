import { useRef, useEffect } from 'react';
import usePostureDetection from '@/hooks/usePostureDetection';
import { useStore } from '@/store';

const WebcamFeed = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { startPostureDetection, stopPostureDetection } = usePostureDetection(videoRef, canvasRef);
    const isDetecting = useStore((state) => state.isDetecting);

    useEffect(() => {
        const setupCamera = async () => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        if (videoRef.current && canvasRef.current) {
                            canvasRef.current.width = videoRef.current.videoWidth;
                            canvasRef.current.height = videoRef.current.videoHeight;
                        }
                    };
                }
            }
        };
        setupCamera();
    }, []);

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Live Feed</h2>
            <div className="relative">
                <video ref={videoRef} autoPlay playsInline className="w-full h-auto rounded-md" />
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
            </div>
            <div className="mt-4 text-center">
                <button
                    onClick={isDetecting ? stopPostureDetection : startPostureDetection}
                    className={`px-6 py-2 rounded-md font-semibold text-white ${
                        isDetecting ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                    }`}
                >
                    {isDetecting ? 'Stop Detection' : 'Start Detection'}
                </button>
            </div>
        </div>
    );
};

export default WebcamFeed;
