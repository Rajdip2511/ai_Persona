# AugPersona v0.1.4

A cutting-edge AI companion application that offers personalized chat experiences through multiple personas. Built with React, Firebase, and Mistral AI, featuring a sleek dark/light mode UI with glassmorphism effects.

![AugPersona Logo](/public/logo.svg)

## 🎉 What's New in v0.1.4

### Build & Performance Improvements
- 🔧 Fixed platform compatibility issues for deployment
- ⚡ Optimized bundle size with better chunk splitting
- 🚀 Improved build configuration for production
- 💪 Enhanced dependency management

### Technical Updates
- Removed platform-specific Rollup dependency
- Updated to platform-agnostic Rollup v4.9.6
- Optimized Vite configuration for better performance
- Improved chunk management for vendor files
- Enhanced build target configuration

### Build Size Optimizations
- Vendor chunks properly split:
  - React vendor bundle
  - Firebase vendor bundle
  - UI components bundle
  - General vendor bundle
- Reduced initial load time
- Better caching strategy

## 🌟 Key Features

### Multiple AI Personas
- 👩‍❤️ **Girlfriend Experience**
  - Emotionally supportive companion
  - Flirty and engaging conversations
  - Personalized responses based on user's background

- 👨‍🏫 **Mentor (Andrew Tate Style)**
  - Aggressive motivational guidance
  - Business and success-focused advice
  - Direct, no-nonsense communication
  - Real actionable steps for growth

- 🤝 **Friend**
  - Casual and relatable interactions
  - Gen Z style communication
  - Supportive daily conversations

### Technical Features
- 🎨 Modern UI with glassmorphism effects
- 🌓 Smart dark/light mode toggle
- 🔐 Secure Firebase authentication
- 💬 Real-time chat with Mistral AI
- 📱 Fully responsive design
- ⚡ Optimized performance
- 🔒 Secure data handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm/yarn
- Firebase account
- Mistral AI API key

### Installation

1. **Clone the repository**
```bash
git clone [repository URL]
cd augpersona
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_MISTRAL_API_KEY=your_mistral_api_key
```

4. **Start Development Server**
```bash
npm run dev
```

## 💡 Usage Guide

### 1. Authentication
- Sign up using email/password or Google account
- Secure authentication through Firebase
- Persistent login state

### 2. Persona Selection
- Choose between Girlfriend, Mentor, or Friend
- Each persona offers unique interaction styles
- Customizable user profile setup

### 3. Chat Interface
- Real-time messaging with AI
- Persona-specific message styling
- Smooth animations and transitions
- Message history preservation

### 4. Profile Customization
- Set your name and background
- Define interests and profession
- Personalize chat experience

## 🛠️ Technical Stack

- **Frontend:**
  - React 18.2
  - TypeScript
  - Vite 5.0.8
  - Tailwind CSS
  - Framer Motion
  - Zustand (State Management)

- **Backend Services:**
  - Firebase 9.15.0
  - Mistral AI API
  - Firebase Security Rules

- **Build Tools:**
  - Rollup 4.9.6
  - TypeScript
  - PostCSS
  - Autoprefixer

## 🔒 Security Features

- Secure Firebase Authentication
- Protected API Routes
- Environment Variable Protection
- Data Encryption
- Rate Limiting
- Input Sanitization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Version History

### v0.1.4 (Current)
- Fixed deployment platform compatibility
- Optimized build configuration
- Improved chunk splitting
- Enhanced performance

### v0.1.3
- Added dark/light mode
- Improved UI animations
- Enhanced chat experience

### v0.1.2
- Implemented chat functionality
- Added persona selection
- Basic authentication

### v0.1.1
- Initial UI implementation
- Firebase setup
- Basic routing

### v0.1.0
- Project initialization
- Basic setup
- Core dependencies

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Mistral AI for the powerful chat API
- Firebase for authentication and backend services
- React community for amazing tools and libraries
- Open source contributors

## 🤔 Support

For support, email support@augpersona.com or join our Discord community.



