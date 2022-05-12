import Head from 'next/head';
import Image from 'next/image';
import TimerButton from '../components/TimerButton/TimerButton';

export default function Home() {
  return (
    <div className='bg-neutral-900'>
      <Head>
        <title>Flimsy Timer</title>
        <meta name="description" content="An opensource speedcubing timer" />
        <link rel="icon" href='/favicon.ico' />

        <script src='/timer.js'></script>

      </Head>

      <>
        <nav className='bg-sky-700 w-screen h-10 top-0 rounded-b'>
          <div className='container'>
            <Image
              className='top-10 ml-2 hover:cursor-pointer hover:scale-110 transition-transform ease-in-out duration-300'
              src='/favicon.ico'
              width={32}
              height={32}
              alt='Logo'
              loading='lazy'
            />
          </div>
        </nav>

        <div className='mt-8 text-white'>
          <h1 id='timer' aria-active='false' className='mt-8 text-8xl text-center subpixel-antialiased font-extrabold'>0.00
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
