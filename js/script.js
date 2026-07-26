'use strict'
//メニューボタン
const btn = document.getElementById('btn');
const nav = document.getElementById('nav')
const moveNav = () => {
    nav.classList.toggle('open');
    btn.classList.toggle('active')
}

btn.addEventListener('click', moveNav)

//br削除

const mediaQuery = window.matchMedia('(max-height : 630px)');
const NEWBr = '<br>';
const indent = document.querySelectorAll('.indent');


const deleteBr = () => {
    document.querySelectorAll('.hero br').forEach((e) => {
        e.remove();
    })
}

const addBr = () => {

    indent.forEach((e) => {
        e.insertAdjacentHTML("beforebegin", NEWBr)
    });
}

const checkBr = () => {

    const hasBr = document.querySelectorAll('.hero br').length !== 0;

    if (mediaQuery.matches) {
        if (!hasBr) return;
        deleteBr();
    } else {
        if (hasBr) return;
        addBr();
    }
}

window.addEventListener('DOMContentLoaded', checkBr);
mediaQuery.addEventListener('change', checkBr);