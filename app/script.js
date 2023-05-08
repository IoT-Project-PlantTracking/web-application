function show() {
    document.querySelector('.hamburger').classList
    .toggle('open');
    document.querySelector('.navigation').classList
    .toggle('active');
}

const menuoption1 = document.querySelector('.option1');
const menuoption2 = document.querySelector('.option2');
const menuoption3 = document.querySelector('.option3');
const menuoption4 = document.querySelector('.option4');

menuoption1.addEventListener('click', () => {
    document.querySelector('.navigation').classList
    .toggle('selected1');
});

menuoption2.addEventListener('click', () => {
    document.querySelector('.navigation').classList
    .toggle('selected2');
});

menuoption3.addEventListener('click', () => {
    document.querySelector('.navigation').classList
    .toggle('selected3');
});

menuoption4.addEventListener('click', () => {
    document.querySelector('.navigation').classList
    .toggle('selected4');
});
