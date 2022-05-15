export default function FormInput({ placeholder, type, name }) {
    return (
        <input className="mt-1 text-neutral-900 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
            id={name} type={type} placeholder={placeholder} name={name} />
    )

}