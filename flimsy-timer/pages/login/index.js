import { GoogleAuthProvider } from 'firebase/auth'
import firebase from '../../firebase/clientApp'
import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'
import useRouter from 'next/router'

function loginWithGoogle() {
    const provider = new GoogleAuthProvider()

    provider.addScope('email')
    firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log('Logged in')
        console.log('Token ', result.credential.accessToken)
        console.log('user ', result.user)

        console.log('logged in with google')

        console.log(firebase.auth().currentUser)
    }).catch(function (error) {
        console.error(error)
    })
}

export default function Login() {
    return (
        <>
            <Head>
                <title>Flimsy Timer - Login</title>
                <Script src="https://accounts.google.com/gsi/client" async defer></Script>
                <Script src='/js/googleButton.js'></Script>
            </Head>
            <div className="self-center my-28 mx-auto h-fit w-fit p-12 bg-indigo-900 text-white">
                <h1 className="font-extrabold subpixel-antialiased text-4xl">Welcome back</h1>

                <div className='mt-12 content-center text-center'>
                    <Image className='hover:cursor-pointer' onClick={loginWithGoogle} src='/images/google_button.png' width={180} height='40' priority={true} />
                </div>

            </div>

        </>
    )
}