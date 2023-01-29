const menubtn = document.querySelector('.menu-btn');
const menu = document.querySelector('nav');

menubtn.addEventListener("click", function () {
    menu.classList.toggle('open')
    menubtn.classList.toggle('close')
})