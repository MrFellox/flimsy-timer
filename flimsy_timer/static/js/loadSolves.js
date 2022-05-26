// Make a get request to get solve Data
const userId = document.getElementById('userId').textContent;

console.log('Getting solves..')


const xhttp = new XMLHttpRequest()
xhttp.open('GET', `/api/getSolveData/${userId}`, true)

xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        console.log('received')
        const wrapper = document.getElementById('wrapper')
        wrapper.innerHTML = xhttp.responseText
    }
}

xhttp.send()
