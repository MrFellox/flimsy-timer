// Make a get request to get solve Data
const userId = document.getElementById('userId').textContent;

const xhttp = new XMLHttpRequest()
xhttp.open('GET', `/api/getSolveData/${userId}`, true)

xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        const wrapper = document.getElementById('wrapper')
        wrapper.innerHTML = xhttp.responseText
    }
}

xhttp.send()
