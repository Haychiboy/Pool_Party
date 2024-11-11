import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAVtkKDIiguyNHoMIUQzLSguGtanyjLeJ4",
  authDomain: "pool-party-38820.firebaseapp.com",
  projectId: "pool-party-38820",
  storageBucket: "pool-party-38820.appspot.com",
  messagingSenderId: "396641330158",
  appId: "1:396641330158:web:dfcbed96de7e6d78d424ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);