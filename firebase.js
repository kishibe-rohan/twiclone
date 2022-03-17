// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBMzOSMMlwD6n4MCZUjvx_JTwJU43wHh0s',
  authDomain: 'twiclone-b5440.firebaseapp.com',
  projectId: 'twiclone-b5440',
  storageBucket: 'twiclone-b5440.appspot.com',
  messagingSenderId: '897397540707',
  appId: '1:897397540707:web:af49da189991476ff2f556',
  measurementId: 'G-2H4PDG9YD1',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export default app
export { db, storage }
