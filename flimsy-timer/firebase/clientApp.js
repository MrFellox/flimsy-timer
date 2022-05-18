import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_APIKEY,
//     authDomain: process.env.FIREBASE_authDomain,
//     projectId: process.env.FIREBASE_projectId,
//     storageBucket: process.env.FIREBASE_storageBucket,
//     messagingSenderId: process.env.FIREBASE_messagingSenderId,
//     appId: process.env.FIREBASE_appId
// };

const firebaseConfig = {
    apiKey: "AIzaSyDcydCLlZezA4mt6Ag0aZ6IW9lt8ztEAIk",

    authDomain: "flimsy-timer.firebaseapp.com",

    projectId: "flimsy-timer",

    storageBucket: "flimsy-timer.appspot.com",

    messagingSenderId: "174074709197",

    appId: "1:174074709197:web:4361ba76c85a76878b5584"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;