import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC287UcPmOthXAjDEMb5rO_09-u1mzR5hk",
    authDomain: "chat-3b914.firebaseapp.com",
    projectId: "chat-3b914",
    storageBucket: "chat-3b914.appspot.com",
    messagingSenderId: "249757344914",
    appId: "1:249757344914:web:a5c5a6b4edf3c239cdf24b"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();