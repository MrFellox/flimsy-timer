export default function TimerButton({ text, tooltip, id }) {
    return (
        <>
            <button id={id} className="w-16 bg-neutral-900 hover:bg-neutral-700 rounded-md text-center align-middle text-white transition-all duration-200 mx-2 font-mono text-sm font-semibold" title={tooltip}>
                {text}</button>
        </>
    )
}