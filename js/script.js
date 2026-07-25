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
const NEWbr = '<br>';
const indent = document.querySelectorAll('.indent');


const deleteBr = (e) => {
    e.forEach((e) => {
        e.remove();
    })
}

const addBr = () => {

    indent.forEach((e) => {
        e.insertAdjacentHTML("beforebegin", NEWbr)
    });
}

const checkBr = () => {
    const br = document.querySelectorAll('.hero br');
    if (mediaQuery.matches) {
        if (br.length === 0) return;
        deleteBr(br);
    } else {
        if (br.length !== 0) return;
        addBr();
    }
}

window.addEventListener('DOMContentLoaded', checkBr);
mediaQuery.addEventListener('change', checkBr);