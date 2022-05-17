import getFirebaseConfig from "../../utils";
import { initializeApp } from "firebase/app";
import { auth } from "firebase/auth" as firebaseAuth;
import { GoogleAuthProvider } from 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const firebase = initializeApp(getFirebaseConfig());

const uiConfig = {
    signInFlow: 'popup',
    signedInSuccessUrl: '/',
    signInOptions: [
        GoogleAuthProvider.PROVIDER_ID
    ]
};

export default function Login() {
    return (
        <>
            <div className="self-center my-28 mx-auto h-fit w-fit p-12 bg-indigo-900 text-white">
                <h1 className="font-extrabold subpixel-antialiased text-4xl">Welcome back</h1>

                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth} />
            </div>

        </>
    )
}