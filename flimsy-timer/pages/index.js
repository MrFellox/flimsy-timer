import Head from 'next/head';
import TimerButton from '../components/TimerButton/TimerButton';
import Script from 'next/script'
import Navbar from '../components/Navbar/Navbar';


function setPlus2() {
  // Get the time


}

export default function Home() {
  return (
    <div className='bg-neutral-900'>
      <Head>
        <title>Flimsy Timer</title>
        <meta name="description" content="An opensource speedcubing timer" />
        <link rel="icon" href='/favicon.ico' />
      </Head>

      <>
        <Script src='/js/timer.js' />
        <Navbar />

        <p id='scramble' className='mt-6 text-white font-bold text-xl font-mono text-center'>L2 R2 U2 F2 L' D' R2 D</p>


        <div className='mt-8 text-white'>
          <h1 id='timer' className='mt-8 text-9xl text-center subpixel-antialiased font-extrabold'>0.00
          </h1>
        </div>

        <div id='buttonsWrapper' className='mt-4 text-center hidden'>
          <TimerButton onclick='' text='+' tooltip='Add a solve' id='add' />

          <TimerButton onclick='' text='+2' tooltip='Set solve as +2' id='add2' />

          <TimerButton text='DNF' tooltip='Set solve as DNF' id='dnf' />

        </div>
      </>
    </div>
  )
}
