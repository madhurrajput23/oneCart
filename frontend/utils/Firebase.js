import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
 authDomain: "loginonecart-e09d4.firebaseapp.com",
  projectId: "loginonecart-e09d4",
  storageBucket: "loginonecart-e09d4.firebasestorage.app",
   messagingSenderId: "794716710996",
  appId: "1:794716710996:web:8b0728716c11c63bede5c1"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}





  // apiKey: "AIzaSyCwZdWBo9PRLG7pBwQchkgdIe8WIukrsqM",
  // authDomain: "loginonecart-e09d4.firebaseapp.com",
  // projectId: "loginonecart-e09d4",
  // storageBucket: "loginonecart-e09d4.firebasestorage.app",
  // messagingSenderId: "794716710996",
  // appId: "1:794716710996:web:8b0728716c11c63bede5c1"
