import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import axios from 'axios';

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const firebaseUser = result.user;
  const idToken = await firebaseUser.getIdToken();

  const { data } = await axios.post('/api/auth/google', { idToken });

  return { user: data.user, token: data.token };
};
