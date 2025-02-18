import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PersonaCard } from '../components/PersonaCard';
import { useStore, Persona } from '../context/store';
import { motion } from 'framer-motion';

export const PersonaSelect = () => {
  const navigate = useNavigate();
  const { user, setUserProfile } = useStore();
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [background, setBackground] = useState('');
  const [error, setError] = useState('');

  // Redirect if not logged in
  if (!user) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPersona) {
      setError('Please select a persona');
      return;
    }

    if (!name || !profession || !hobbies || !background) {
      setError('Please fill in all fields');
      return;
    }

    // Update local state only
    setUserProfile({
      name,
      profession,
      hobbies: hobbies.split(',').map((hobby) => hobby.trim()),
      background,
      selectedPersona,
    });
    
    // Navigate to chat
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-background p-4 pt-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h1 className="persona-title">Choose Your AI Companion</h1>
          <p className="persona-subtitle mt-2">
            Select a persona and start chatting
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {(['girlfriend', 'mentor', 'friend'] as const).map((persona, index) => (
            <motion.div
              key={persona}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <PersonaCard
                persona={persona}
                isSelected={selectedPersona === persona}
                onClick={() => {
                  setSelectedPersona(persona);
                  setError('');
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {selectedPersona && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="persona-form">
              <h2 className="mb-4 text-2xl font-semibold persona-name">Tell Us About You</h2>
              <div className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="persona-input"
                />
                <Input
                  placeholder="Your Profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  required
                  className="persona-input"
                />
                <Input
                  placeholder="Your Hobbies (comma-separated)"
                  value={hobbies}
                  onChange={(e) => setHobbies(e.target.value)}
                  required
                  className="persona-input"
                />
                <Input
                  placeholder="A Brief Background About You"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  required
                  className="persona-input"
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button type="submit" className="w-full h-12 start-chat-button">
                    <span className="start-chat-text">Start Chatting</span>
                  </Button>
                </motion.div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-sm text-destructive dark:text-glow-sm"
                  >
                    {error}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}; 