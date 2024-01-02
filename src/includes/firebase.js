import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyB3uVUQcMoYKYdjlmFMEXL-IwtE8CCvktI",
    authDomain: "chatapp-dc165.firebaseapp.com",
    projectId: "chatapp-dc165",
    storageBucket: "chatapp-dc165.appspot.com",
    messagingSenderId: "46233748800",
    appId: "1:46233748800:web:83b27d30df0383f1b5a6a5"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const userCollection = db.collection('users')
const msgCollection = db.collection('messages');

export {
    auth,
    db,
    userCollection,
    msgCollection
}