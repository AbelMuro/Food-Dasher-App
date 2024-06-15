import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize authentication and exporting it
export const auth = getAuth(app);                                           //alot of the times, to use firebase, you will need to export these objects

// Initialize storage and exporting it
export const storage = getStorage(app, 'gs://example-d17a1.appspot.com');  //you must include the 'bucket' name for the storage you are trying to access

// Initialize firestore database and exporting it
export const db = getFirestore(app);