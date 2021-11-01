import { initializeApp } from 'firebase/app'
// import { getFirestore } from 'firebase/firestore'

const firebaseApp = {
  apiKey: "AIzaSyAyJ9bwvMdB4dKQpIIts6V-f3mPar8_BXc",
  authDomain: "kaim-share.firebaseapp.com",
  projectId: "kaim-share",
  storageBucket: "kaim-share.appspot.com",
  messagingSenderId: "468620257589",
  appId: "1:468620257589:web:51b32cc62fefb1fb0dc47c",
  measurementId: "G-YP01YXGH0Q"
};

export const initialize = initializeApp(firebaseApp)
// export const initialize = firebase.initializeApp(firebaseConfig);