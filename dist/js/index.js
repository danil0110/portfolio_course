const hamburgerBtn = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeBtn = document.querySelector('.menu__close');
const overlay = document.querySelector('.menu__overlay');

function openMenu() {
    menu.classList.add('active');
}

function closeMenu() {
    menu.classList.remove('active');
}

hamburgerBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
