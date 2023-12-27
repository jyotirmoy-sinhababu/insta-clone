import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAfXnYQ1F_GKVSWhBqsCM5p5PBsbKchXZA',
  authDomain: 'instagram-clone-4b565.firebaseapp.com',
  projectId: 'instagram-clone-4b565',
  storageBucket: 'instagram-clone-4b565.appspot.com',
  messagingSenderId: '476969919855',
  appId: '1:476969919855:web:998734d476a6f28002749a',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
