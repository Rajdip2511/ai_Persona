import { motion } from 'framer-motion';
import { Persona } from '../context/store';

interface PersonaCardProps {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
}

const personaDetails: Record<Persona, {
  title: string;
  description: string;
}> = {
  girlfriend: {
    title: 'Girlfriend',
    description: 'A caring and romantic companion who will support you emotionally'
  },
  mentor: {
    title: 'Mentor',
    description: 'A professional guide to help you grow and achieve your goals'
  },
  friend: {
    title: 'Friend',
    description: 'A casual and fun companion to chat and hang out with'
  }
};

export const PersonaCard = ({ persona, isSelected, onClick }: PersonaCardProps) => {
  const details = personaDetails[persona];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`persona-card cursor-pointer ${isSelected ? 'selected' : ''}`}
    >
      {persona === 'girlfriend' && (
        <motion.div 
          className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-pink-300/50 dark:ring-pink-500/40 shadow-[0_0_30px_rgba(236,72,153,0.3)] dark:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 40px rgba(236, 72, 153, 0.5)",
          }}
          animate={isSelected ? {
            boxShadow: [
              "0 0 20px rgba(236, 72, 153, 0.4)",
              "0 0 40px rgba(236, 72, 153, 0.6)",
              "0 0 20px rgba(236, 72, 153, 0.4)"
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative w-full h-full">
            <img 
              src="/girlfriend-avatar.jpg" 
              alt="Girlfriend Avatar"
              className="w-full h-full object-cover hover:scale-125 transition-transform duration-500"
            />
          </div>
        </motion.div>
      )}
      {persona === 'mentor' && (
        <motion.div 
          className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-[#3b82f6]/50 dark:ring-[#60a5fa]/40 shadow-[0_0_40px_rgba(59,130,246,0.5)] dark:shadow-[0_0_50px_rgba(59,130,246,0.6)]"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 60px rgba(59, 130, 246, 0.7)",
          }}
          animate={isSelected ? {
            boxShadow: [
              "0 0 40px rgba(59, 130, 246, 0.5)",
              "0 0 60px rgba(59, 130, 246, 0.7)",
              "0 0 40px rgba(59, 130, 246, 0.5)"
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative w-full h-full">
            <img 
              src="/mentor-avatar.jpg" 
              alt="Mentor Avatar"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        </motion.div>
      )}
      {persona === 'friend' && (
        <motion.div 
          className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-[#22c55e]/50 dark:ring-[#4ade80]/40 shadow-[0_0_40px_rgba(34,197,94,0.5)] dark:shadow-[0_0_50px_rgba(74,222,128,0.6)]"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 60px rgba(34, 197, 94, 0.7)",
          }}
          animate={isSelected ? {
            boxShadow: [
              "0 0 40px rgba(34, 197, 94, 0.5)",
              "0 0 60px rgba(34, 197, 94, 0.7)",
              "0 0 40px rgba(34, 197, 94, 0.5)"
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative w-full h-full">
            <img 
              src="/friend-avatar.jpg" 
              alt="Friend Avatar"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        </motion.div>
      )}
      
      <motion.h3 
        className={`persona-name ${
          persona === 'girlfriend' 
            ? 'text-pink-400 dark:text-pink-300' 
            : persona === 'friend'
            ? 'text-green-400 dark:text-green-300'
            : 'text-blue-400 dark:text-blue-300'
        }`}
        animate={isSelected ? { 
          textShadow: persona === 'girlfriend'
            ? [
                "0 0 30px rgba(236, 72, 153, 0.7)",
                "0 0 50px rgba(236, 72, 153, 0.9)",
                "0 0 30px rgba(236, 72, 153, 0.7)"
              ]
            : persona === 'friend'
            ? [
                "0 0 30px rgba(34, 197, 94, 0.7)",
                "0 0 50px rgba(34, 197, 94, 0.9)",
                "0 0 30px rgba(34, 197, 94, 0.7)"
              ]
            : [
                "0 0 30px rgba(96, 165, 250, 0.7)",
                "0 0 50px rgba(96, 165, 250, 0.9)",
                "0 0 30px rgba(96, 165, 250, 0.7)"
              ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {details.title}
      </motion.h3>
      
      <p className="persona-description">
        {details.description}
      </p>

      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-blue-500 dark:bg-blue-400 rounded-full p-1 shadow-[0_0_20px_rgba(96,165,250,0.5)]"
        >
          <svg 
            className="w-4 h-4 text-white"
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}; 