document.addEventListener('DOMContentLoaded', () => {
    console.log('Dom loaded');

    let startTime = null;
    const timer = document.getElementById('timer');
    let timerActive = false;

    function showTime() {
        if (timerActive == true) {
            let now = Date.now();

            // Parse elapsed minutes, seconds and ms.
            let elapsed = now - startTime;
            let minutes = Math.floor(elapsed / 60000);
            let seconds = Math.floor((elapsed % 60000) / 1000);
            let milliseconds = Math.floor((elapsed % 1000) / 10);

            console.log(`${minutes}:${seconds}:${milliseconds}`);

            if (minutes <= 0) {
                timer.textContent = `${seconds}.${milliseconds}`;
            }

            else {
                timer.textContent = `${minutes}:${seconds}.${milliseconds}`;
            }
            setTimeout(showTime, 10);
        }

    }

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && timerActive == false) {
            timerActive = true;
            startTime = Date.now();

            setTimeout(showTime, 10);
        }

        else if (e.code == 'Space' && timerActive == true) {
            timerActive = false;

            let timerData = document.getElementById('timerData');
            timerData.textContent = `Your last time was: ${timer.textContent}`;
        }
    })
})