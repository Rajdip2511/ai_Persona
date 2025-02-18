import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useStore } from '../context/store';
import { Persona } from '../context/store';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatBubble = ({ message, isUser, timestamp }: ChatBubbleProps) => {
  const { isDarkMode, userProfile } = useStore();

  const getPersonaImage = () => {
    if (isUser) return null;
    
    switch (userProfile?.selectedPersona) {
      case 'girlfriend':
        return {
          src: '/girlfriend-avatar.jpg',
          alt: 'Girlfriend Avatar',
          ringColor: 'ring-pink-500/30'
        };
      case 'mentor':
        return {
          src: '/mentor-avatar.jpg',
          alt: 'Mentor Avatar',
          ringColor: 'ring-blue-500/30'
        };
      case 'friend':
        return {
          src: '/friend-avatar.jpg',
          alt: 'Friend Avatar',
          ringColor: 'ring-green-500/30'
        };
      default:
        return null;
    }
  };

  const personaImage = getPersonaImage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'flex w-full',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {/* Profile Picture - Only show for non-user messages */}
      {!isUser && personaImage && (
        <div className="mr-2">
          <div className={cn(
            "w-10 h-10 rounded-full overflow-hidden ring-2",
            personaImage.ringColor
          )}>
            <img
              src={personaImage.src}
              alt={personaImage.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2 glass-morphism',
          isUser
            ? 'rounded-br-sm bg-primary text-primary-foreground'
            : 'rounded-bl-sm'
        )}
      >
        <p className={cn(
          "text-sm",
          isUser && isDarkMode && "user-message-glow"
        )}>{message}</p>
        <time className="mt-1 text-xs opacity-50">
          {timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </time>
      </div>
    </motion.div>
  );
}; 