import create from 'zustand';

type PostureData = {
  time: string;
  score: number; // 1 for good, 0 for bad
};

interface AppState {
  isDetecting: boolean;
  issues: string[]; // --- UPDATED: Now an array to hold multiple issues ---
  exercise: string | null; // --- NEW: To hold the recommended exercise ---
  postureHistory: PostureData[];
  setIsDetecting: (isDetecting: boolean) => void;
  setPostureIssues: (issues: string[], exercise: string | null) => void; // --- UPDATED: New setter ---
  addPostureData: (data: PostureData) => void;
}

// --- Helper for audio/speech feedback ---
let lastSpokenMessage = '';
const speak = (message: string) => {
  if (message && message !== lastSpokenMessage) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
    lastSpokenMessage = message;
    // Reset after a while to allow re-speaking the same message later
    setTimeout(() => { lastSpokenMessage = '' }, 10000);
  }
};

export const useStore = create<AppState>((set, get) => ({
  isDetecting: false,
  issues: [],
  exercise: null,
  postureHistory: [],
  setIsDetecting: (isDetecting) => set({ isDetecting }),
  setPostureIssues: (issues, exercise) => {
    // Only update and speak if the issues have actually changed
    if (JSON.stringify(issues) !== JSON.stringify(get().issues)) {
      set({ issues, exercise });
      if (issues.length > 0) {
        const primaryIssue = issues[0];
        speak(`Please fix your posture. ${primaryIssue}.`);
      }
    }
  },
  addPostureData: (data) =>
    set((state) => ({
      postureHistory: [...state.postureHistory.slice(-9), data], // Keep last 10 entries
    })),
}));

