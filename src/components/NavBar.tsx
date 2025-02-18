import { signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../lib/firebase';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { useStore } from '../context/store';

export const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser, setUserProfile } = useStore();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear all local state
      setUser(null);
      setUserProfile(null);
      // Navigate to login
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Main Navbar */}
      <nav className="flex items-center bg-background/30 backdrop-blur-md px-4 py-3 border-none">
        <div className="flex-1 flex items-center cursor-pointer" onClick={handleLogoClick}>
          <div className="relative w-8 h-8 overflow-hidden rounded-full ring-2 ring-pink-500/50">
            <img 
              src="/logo.jpg"
              alt="AugPersona Logo" 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-125"
            />
          </div>
          <span className="ml-3 text-lg font-semibold text-foreground">
            AugPersona
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </nav>

      {/* Glowing Separator */}
      <div className="relative">
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}; 