const form = document.querySelector('.form');

form.addEventListener('submit', (x) => {
    const password = document.querySelector('#password1').value;
    const confirmPassword = document.querySelector('#password2').value;

    if(password != confirmPassword){
        x.preventDefault();
        alert("Passwords doesn't match!");
        document.querySelector('.container').classList
        .toggle('mismatch');
    }
})