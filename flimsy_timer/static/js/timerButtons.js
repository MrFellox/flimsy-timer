const userId = document.getElementById('userId').textContent;

function setDNF() {
    // Make a request to set the time to DNF

    const xhttp = new XMLHttpRequest();

    xhttp.open('POST', `/api/setDNF/${userId}`, true);
    xhttp.send();


}

function setPlusTwo() {

}