import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAM7LORtIG7OGl-MOc4N3a9RBQZSZG_Wzg",
  authDomain: "bloomcycle-7ffcb.firebaseapp.com",
  projectId: "bloomcycle-7ffcb",
  storageBucket: "bloomcycle-7ffcb.firebasestorage.app",
  messagingSenderId: "518734637342",
  appId: "1:518734637342:web:42a2c6be5123657153010f",
  measurementId: "G-J0BZLFCK8C"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)