
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC5MjBuvN_0bVv4XidoOAMPZKLnbv9s7-c",
  authDomain: "movieflex-8044c.firebaseapp.com",
  projectId: "movieflex-8044c",
  storageBucket: "movieflex-8044c.appspot.com",
  messagingSenderId: "732254015366",
  appId: "1:732254015366:web:4ede46ce412b00f6e9e607"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);