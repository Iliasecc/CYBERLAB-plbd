function checkCredentials() {
    const username = document.querySelector('.login-box input[type="text"]').value;
    const password = document.querySelector('.login-box input[type="password"]').value;

    if (username === 'admin' && password === 'admin') {
        window.location.href = "indexx.html";
    } else {
        alert('Identifiants incorrects. Veuillez réessayer.');
    }
}
