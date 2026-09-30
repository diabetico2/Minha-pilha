export { initializeApp } from 'firebase/app';
export { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, connectAuthEmulator, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
export { getDatabase, get, ref, onValue, update, connectDatabaseEmulator } from 'firebase/database';
