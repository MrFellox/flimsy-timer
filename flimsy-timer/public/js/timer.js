let startTime = null;
const timer = document.getElementById('timer');
let timerActive = false;
let timerClock = 0;
let startClock = 3;

console.log('timer.js file loaded.')

// Updates the elapsed time
function showTime() {
    if (timerActive == true) {
        let now = Date.now();

        // Parse elapsed minutes, seconds and ms.
        let elapsed = now - startTime;
        let minutes = Math.floor(elapsed / 60000);
        let seconds = Math.floor((elapsed % 60000) / 1000);
        let milliseconds = Math.floor((elapsed % 1000) / 10);

        if (minutes <= 0) {
            timer.textContent = `${seconds}.${milliseconds}`;
        }

        else {
            timer.textContent = `${minutes}:${seconds}.${milliseconds}`;
        }

        setTimeout(showTime, 10);
    }

}

window.addEventListener('keypress', (e) => {
    // Add to the initialize timer clock

    // Check if can start timer
    if (timerClock > startClock) {
        // Get the timer

        const timer = document.getElementById('timer')
        timer.classList.remove('text-white')
        timer.style.color = 'green'
    }


    else if (e.code == 'Space' && timerActive == false) {
        timerClock++;
    }
})

window.addEventListener('keyup', async function (e) {

    // Start timer
    if (e.code === 'Space' && timerActive == false && timerClock > startClock) {
        timerActive = true;
        timerClock = 0;
        startTime = Date.now();

        // Set timer white

        const timer = document.getElementById('timer')
        timer.style.color = 'white'

        // Hide timer buttons and scramble and nav
        document.getElementById('buttonsWrapper').classList.add('hidden')
        document.getElementById('scramble').classList.add('hidden')
        document.getElementById('appNav').classList.add('hidden')

        setTimeout(showTime, 10);
    }

    // Deactivate timer
    else if (e.code == 'Space' && timerActive == true) {
        timerActive = false;

        // Set timer white

        const timer = document.getElementById('timer')
        timer.style.color = 'white'


        // Show timerbuttons and nav
        document.getElementById('buttonsWrapper').classList.remove('hidden')
        document.getElementById('appNav').classList.remove('hidden')


        // Update scramble and show it

        const data = await fetch(`/api/scrambles/333`)
        const response = await data.json()

        const scramble = document.getElementById('scramble')
        scramble.textContent = response.scramble

        document.getElementById('scramble').classList.remove('hidden')
    }
})