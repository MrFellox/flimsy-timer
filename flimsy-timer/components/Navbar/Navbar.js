export default function Navbar() {
    return (
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
        </>
    )
}