'use strict'

const btn = document.getElementById('btn');
const nav = document.getElementById('nav')
const moveNav = () => {
    nav.classList.toggle('open');
    btn.classList.toggle('active')
}

btn.addEventListener('click', moveNav)