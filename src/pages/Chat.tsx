import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ChatBubble } from '../components/ChatBubble';
import { TypingIndicator } from '../components/TypingIndicator';
import { useStore } from '../context/store';
import { generateAIResponse } from '../services/mistral';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const Chat = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Redirect if not authenticated or no profile
  if (!user || !userProfile) {
    navigate('/');
    return null;
  }

  useEffect(() => {
    // Add initial greeting if no messages
    if (messages.length === 0) {
      const initialMessage = getInitialGreeting(userProfile.selectedPersona);
      setMessages([
        {
          id: Date.now().toString(),
          content: initialMessage,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length, userProfile.selectedPersona]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getInitialGreeting = (persona: string) => {
    switch (persona) {
      case 'girlfriend':
        return "Hey baby! ❤️ I've been looking forward to talking with you. How has your day been? I'd love to hear what's on your mind.";
      case 'mentor':
        return "LISTEN UP BROTHER! You're living in the MATRIX right now - making EXCUSES and settling for MEDIOCRITY! I've got Bugattis and MILLIONS because I chose to be DIFFERENT. Ready to become a TOP G or stay BROKE? The choice is yours. BREATHE AIR! 💨";
      case 'friend':
        return "Yooo what's good my guy! 🔥 Ready to vibe and chat? fr fr, tell me what's been happening! 💯";
      default:
        return "Hello! How can I help you today?";
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isTyping) return;

    // Clear any previous errors
    setError(null);

    const userMessage = newMessage.trim();
    setNewMessage('');

    // Add user message
    const userMessageObj = {
      id: Date.now().toString(),
      content: userMessage,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessageObj]);

    try {
      setIsTyping(true);
      console.log('Sending message to AI...', {
        userProfile,
        messageCount: messages.length,
        newMessage: userMessage
      });

      // Create a new abort controller for this request
      const controller = new AbortController();
      abortControllerRef.current = controller;

      // Get AI response
      const aiResponse = await generateAIResponse(
        userProfile,
        [
          ...messages.map((msg) => ({
            role: msg.isUser ? ('user' as const) : ('assistant' as const),
            content: msg.content,
          })),
          { role: 'user' as const, content: userMessage }
        ],
        controller.signal
      );

      // Only proceed if the request wasn't cancelled
      if (!controller.signal.aborted) {
        console.log('Received AI response:', aiResponse);

        if (!aiResponse) {
          throw new Error('Empty response from AI');
        }

        // Add AI response
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: aiResponse,
            isUser: false,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error('Full error details:', error);
      
      if (error instanceof Error) {
        if (error.message !== 'Request cancelled' && error.message !== 'canceled') {
          const errorMessage = error.message || 'Failed to generate response';
          setError(errorMessage);
          console.error('Error generating response:', {
            error,
            userProfile,
            messageCount: messages.length
          });
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
        console.error('Unexpected error type:', error);
      }
    } finally {
      setIsTyping(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="flex-1 overflow-y-auto p-4 pt-16">
        <div className="mx-auto max-w-4xl space-y-4">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          {isTyping && <TypingIndicator />}
          {error && (
            <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t bg-background p-4">
        <form
          onSubmit={handleSendMessage}
          className="mx-auto flex max-w-4xl items-center space-x-4"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" disabled={!newMessage.trim() || isTyping}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}; 