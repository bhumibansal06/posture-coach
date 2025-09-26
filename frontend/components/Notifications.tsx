import { useStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = () => {
  const issues = useStore((state) => state.issues);
  const exercise = useStore((state) => state.exercise);
  const hasIssues = issues.length > 0;

  return (
    <AnimatePresence>
      {hasIssues && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-5 right-5 bg-red-600 text-white p-6 rounded-lg shadow-2xl max-w-sm z-50 border-4 border-red-700/50"
        >
          <h3 className="text-xl font-bold mb-2 flex items-center">
            {/* Simple alert icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Posture Alert!
          </h3>
          <ul className="list-disc list-inside mb-4 pl-1">
            {issues.map((issue, index) => (
              <li key={index} className="text-lg">{issue}</li>
            ))}
          </ul>
          {exercise && (
            <div className="bg-red-700/50 p-3 rounded-md mt-3">
              <p className="font-semibold text-yellow-300">Recommended Action:</p>
              <p className="text-md">{exercise}</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notifications;

