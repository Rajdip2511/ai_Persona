import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { PersonaCard } from './PersonaCard';
import { useStore, Persona } from '../context/store';

export const PersonaSelect = () => {
  const navigate = useNavigate();
  const { setUserProfile } = useStore();
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [background, setBackground] = useState('');
  const [error, setError] = useState('');

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

    try {
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
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 pt-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Choose Your AI Companion</h1>
          <p className="mt-2 text-muted-foreground">
            Select a persona and tell us about yourself
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {(['girlfriend', 'mentor', 'friend'] as const).map((persona) => (
            <PersonaCard
              key={persona}
              persona={persona}
              isSelected={selectedPersona === persona}
              onClick={() => {
                setSelectedPersona(persona);
                setError('');
              }}
            />
          ))}
        </div>

        {selectedPersona && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-morphism rounded-xl p-6">
              <h2 className="mb-4 text-2xl font-semibold">Tell Us About You</h2>
              <div className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  placeholder="Your Profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  required
                />
                <Input
                  placeholder="Your Hobbies (comma-separated)"
                  value={hobbies}
                  onChange={(e) => setHobbies(e.target.value)}
                  required
                />
                <Input
                  placeholder="A Brief Background About You"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full">
                  Start Chatting
                </Button>
                {error && (
                  <p className="text-center text-sm text-destructive">{error}</p>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}; 