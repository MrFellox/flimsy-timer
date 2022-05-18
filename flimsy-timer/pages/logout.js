import firebase from '../firebase/clientApp'
import useRouter from 'next/router'
import Script from 'next/script'

function logout() {
    const auth = firebase.auth()
    const user = auth.currentUser;

    user.delete().then(function () {
        console.log('User deleted')
        const router = useRouter()

        router.push('/login')

    }
    ).catch(function (error) {
        console.log(error)
    }
    )
}

export default function Logout() {

    logout()

    return (
        <>
            <Script src='/js/logout.js' />
            <p className='text-white'>Logging out...</p>
        </>
    )
}