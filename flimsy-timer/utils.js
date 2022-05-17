import { initializeApp } from "firebase/app";

export default function getFirebaseConfig() {
    // Your web app's Firebase configuration

    const firebaseConfig = {

        apiKey: "AIzaSyD7kQ_eGE2wTdJfK7u_vMwwd17woG6Ldig",

        authDomain: "flimsy-timer.firebaseapp.com",

        projectId: "flimsy-timer",

        storageBucket: "flimsy-timer.appspot.com",

        messagingSenderId: "174074709197",

        appId: "1:174074709197:web:4361ba76c85a76878b5584"

    };


    return firebaseConfig
}