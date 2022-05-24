let startTime = null;
const timer = document.getElementById('timer');
let timerActive = false;
let timerClock = 0;
let startClock = 3;

const userId = document.getElementById('userId').textContent;

console.log('timer.js file loaded.')

// Check local storage

if (localStorage.getItem('data') == null) {
    localStorage.setItem('data', '{"solves": []}');
}

// Updates the elapsed time
function showTime() {
    if (timerActive == true) {

        const timer = document.getElementById('timer');

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

        // Request database to save solve

        const xhttp = new XMLHttpRequest();
        let now = new Date()
        let scrambleToSave = document.getElementById('scramble').textContent;

        // xhttp.open('POST', `/save/${userId}/${timer.textContent}/${scrambleToSave}/333`, true);
        xhttp.open('POST', `/api/save`, true);

        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify({
            time: timer.textContent,
            scramble: scrambleToSave,
            isDNF: false,
            isPlus2: false,
            date: now.toISOString(),
            puzzle: '333'
        }));

        // Update scramble and show it

        const data = await fetch(`/api/gen333scramble`)
        const response = await data.text()

        const scramble = document.getElementById('scramble')
        scramble.textContent = response

        document.getElementById('scramble').classList.remove('hidden')
    }
})