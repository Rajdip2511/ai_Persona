import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/Button';
import { useStore } from '../context/store';
import { useEffect } from 'react';

export const ThemeToggle = () => {
  const { isDarkMode, setDarkMode } = useStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setDarkMode(!isDarkMode)}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 transition-all" />
      ) : (
        <Moon className="h-5 w-5 transition-all" />
      )}
    </Button>
  );
}; 