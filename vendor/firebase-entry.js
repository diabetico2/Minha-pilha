export { initializeApp } from 'firebase/app';
export { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, connectAuthEmulator } from 'firebase/auth';
export { getDatabase, ref, onValue, update, connectDatabaseEmulator } from 'firebase/database';
