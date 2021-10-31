// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js')

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyJ9bwvMdB4dKQpIIts6V-f3mPar8_BXc",
  authDomain: "kaim-share.firebaseapp.com",
  projectId: "kaim-share",
  storageBucket: "kaim-share.appspot.com",
  messagingSenderId: "468620257589",
  appId: "1:468620257589:web:51b32cc62fefb1fb0dc47c",
  measurementId: "G-YP01YXGH0Q"
};

// Initialize Firebase
export const initialize = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = firebase.firestore()