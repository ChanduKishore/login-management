// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "<your Api key>",
  authDomain: "<your project domain>",
  projectId: "<your project id>",
  storageBucket: "<your storage bucket>",
  messagingSenderId: "<messengerid>",
  appId: "<your app id>"
};

// Initialize Firebase
 const firebase = initializeApp(firebaseConfig);
 export default firebase
