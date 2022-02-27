// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import  "firebase/compat/auth"
import  "firebase/compat/database"


// const firebaseConfig = {
//   apiKey: "AIzaSyCYDiIf0NaB4y1DVUpvi9fFXJP2gbDl3rI",
//   authDomain: "happy-bump.firebaseapp.com",
//   databaseURL: "https://happy-bump-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "happy-bump",
//   storageBucket: "happy-bump.appspot.com",
//   messagingSenderId: "894991613317",
//   appId: "1:894991613317:web:e9f657e508777709cf98ec",
//   measurementId: "G-YGL7Y5M0DG"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDkQDMsTGg0MO254S5Uz__p4snaTn9GhKg",
  authDomain: "utube-admin.firebaseapp.com",
  projectId: "utube-admin",
  storageBucket: "utube-admin.appspot.com",
  messagingSenderId: "154106459578",
  appId: "1:154106459578:web:2f3ea428535ab30e389983",
  measurementId: "G-E3YFKMDWS5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



export default firebase ;