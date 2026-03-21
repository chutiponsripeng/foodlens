import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            "AIzaSyC23dmJDTwnq4iwgvbJqHF_HDY-0-Sl4eE",
  authDomain:        "mindcheck-01.firebaseapp.com",
  projectId:         "mindcheck-01",
  storageBucket:     "mindcheck-01.firebasestorage.app",
  messagingSenderId: "268584847397",
  appId:             "1:268584847397:web:e384ecb3e2b841a3aad7cc",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export default app