import { motion } from 'framer-motion';

export const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 p-4">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{
          scale: [0.8, 1, 0.8],
          transition: { duration: 0.8, repeat: Infinity },
        }}
        className="h-2 w-2 rounded-full bg-primary"
      />
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{
          scale: [0.8, 1, 0.8],
          transition: { duration: 0.8, delay: 0.2, repeat: Infinity },
        }}
        className="h-2 w-2 rounded-full bg-primary"
      />
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{
          scale: [0.8, 1, 0.8],
          transition: { duration: 0.8, delay: 0.4, repeat: Infinity },
        }}
        className="h-2 w-2 rounded-full bg-primary"
      />
    </div>
  );
}; 