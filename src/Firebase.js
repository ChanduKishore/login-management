// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe-ol7LaIyeOIz9jWYZLnzddVYas8OS2c",
  authDomain: "login-management-e5f38.firebaseapp.com",
  projectId: "login-management-e5f38",
  storageBucket: "login-management-e5f38.appspot.com",
  messagingSenderId: "782961283712",
  appId: "1:782961283712:web:d9092481a2a7cf4a31cc65"
};

// Initialize Firebase
 const firebase = initializeApp(firebaseConfig);

 export default firebase