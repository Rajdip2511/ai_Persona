import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, browserLocalPersistence, AuthError } from 'firebase/auth';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);
const auth: Auth = getAuth(app);

// Add persistence to reduce auth token refresh issues
auth.setPersistence(browserLocalPersistence).catch((error: AuthError) => {
  console.error('Error setting auth persistence:', error);
});

export { auth, analytics }; 