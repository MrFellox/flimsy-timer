import Head from 'next/head';
import Image from 'next/image';
import TimerButton from '../components/TimerButton/TimerButton';
import Script from 'next/script'
import { isMobile } from 'react-device-detect'
import Navbar from '../components/Navbar/Navbar';

export default function Home() {

  if (isMobile) {
    return (
      <>
        <div className='w-screen h-screen m-0 bg-black'>
          <h1 className='p-20 text-center text-xl font-mono text-red-700'>You can't access Flimsy Timer on mobile devices.</h1>
        </div>
      </>
    )
  }

  else {
    return (
      <div className='bg-neutral-900'>
        <Head>
          <title>Flimsy Timer</title>
          <meta name="description" content="An opensource speedcubing timer" />
          <link rel="icon" href='/favicon.ico' />
        </Head>

        <>
          <Script src='/timer.js' />
          <Navbar />

          <div className='mt-8 text-white'>
            <h1 id='timer' className='mt-8 text-8xl text-center subpixel-antialiased font-extrabold'>0.00
            </h1>
          </div>

          <div className='mt-4 text-center'>
            <TimerButton text='+' tooltip='Add a solve' id='add' />

            <TimerButton text='+2' tooltip='Set solve as +2' id='add2' />

            <TimerButton text='DNF' tooltip='Set solve as DNF' id='dnf' />

          </div>

          <p id='timerData' className='text-center text-white font-medium font-mono text-xl mt-8'></p>
        </>
      </div>
    )
  }
}
