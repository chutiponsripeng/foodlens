import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSy5Mm4JJyfqMsRxZhECsnKr2RQCooQCE",
  authDomain: "foodlens-01.firebaseapp.com",
  projectId: "foodlens-01",
  storageBucket: "foodlens-01.firebasestorage.app",
  messagingSenderId: "613666983998",
  appId: "1:613666983998:web:211ce34cda003dc062816f",
  measurementId: "G-KLPSLFCVMY"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export default app