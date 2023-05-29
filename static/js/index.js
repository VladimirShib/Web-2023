const burgerButton = document.getElementById('burger');
const burgerMenu = document.getElementById('burgerMenu');
const layout = document.getElementById('layout');

const openBurgerMenu = function() {
    burgerButton.classList.add('hidden-important');
    burgerMenu.classList.add('opened');
    layout.classList.remove('hidden');
}

const closeBurgerMenu = function() {
    layout.classList.add('hidden');
    burgerMenu.classList.remove('opened');
    burgerButton.classList.remove('hidden-important');
}

burgerButton.addEventListener('click', openBurgerMenu);
layout.addEventListener('click', closeBurgerMenu);