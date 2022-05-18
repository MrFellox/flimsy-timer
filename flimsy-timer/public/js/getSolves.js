let data = localStorage.getItem('data')
data = JSON.parse(data)

let solves = data.solves
let solvesDiv = document.getElementById('solvesWrapper')
console.log(solves)

solves.forEach(solve => {
    let div = document.createElement('div')
    div.className = 'bg-stone-900 border ml-4 shadow shadow-sky-700 rounded-lg w-11/12 h-fit py-2 content-center my-8'

    let time = document.createElement('h1')
    time.className = 'text-white font-extrabold subpixel-antialiased ml-4 my-2 text-2xl'
    time.textContent = solve.time

    let scramble = document.createElement('p')
    scramble.className = 'text-white subpixel-antialiased ml-4 my-2 text-2xl font-mono font-semibold'
    scramble.textContent = solve.scramble

    let preview = document.createElement('twisty-player')
    preview.setAttribute('alg', solve.scramble)
    preview.setAttribute('background', 'none')
    preview.className = 'ml-12 my-2'
    preview.style.background = '#1C1917'

    div.appendChild(time)
    div.appendChild(scramble)
    div.appendChild(preview)

    solvesDiv.appendChild(div)
});