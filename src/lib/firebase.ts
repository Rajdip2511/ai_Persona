import { initializeApp, getApps } from 'firebase/app';
import { getAuth, browserLocalPersistence } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// Add persistence to reduce auth token refresh issues
auth.setPersistence(browserLocalPersistence).catch((error) => {
  console.error('Error setting auth persistence:', error);
});

export { auth }; 