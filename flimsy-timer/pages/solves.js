import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'

export default function Solves() {
    return (
        <>
            <Head>
                <title>Flimsy Timer - Solves</title>
            </Head>

            <script src="https://cdn.cubing.net/js/scramble-display" type="module"></script>

            <div className='bg-stone-900 border shadow ml-4 shadow-sky-700 rounded-lg w-11/12 h-fit py-2 content-center my-8 hidden'></div>
            <h1 className='text-white font-extrabold subpixel-antialiased ml-4 my-2 text-2xl hidden'></h1>

            <a className='text-3xl text-white ml-4 mt-12 font-extrabold'><Link href='/'>Back to timer</Link></a>
            <div id='solvesWrapper'></div>
            <Script src='/js/getSolves.js'></Script>
        </>
    )
}