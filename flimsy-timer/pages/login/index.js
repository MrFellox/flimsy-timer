import FormInput from "../../components/FormInput/FormInout";

export default function Login() {
    return (
        <>
            <div className="self-center my-28 mx-auto h-fit w-fit p-12 bg-indigo-900 text-white">
                <h1 className="font-extrabold subpixel-antialiased text-4xl">Welcome back</h1>

                <form className="mt-4" action='/api/loginhandler' method='POST'>
                    <label className="ml-px block text-sm font-medium leading-5 text-white subpixel-antialiased my-2" htmlFor="username">
                        Username
                    </label>
                    <FormInput name='username' placeholder='Username' type='text' />
                    <br />

                    <label className="ml-px block text-sm font-medium leading-5 text-white subpixel-antialiased my-2" htmlFor="username">
                        Password
                    </label>
                    <FormInput name='Password' placeholder='Password' type='password' />
                    <br />
                    <button className='align-center self-center content-centertext-center bg-white px-4 font-bold subpixel-antialiased text-neutral-900 rounded-sm' type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}