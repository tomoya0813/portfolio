'use strict'
//メニューボタン
const btn = document.getElementById('btn');
const nav = document.getElementById('nav')
const moveNav = () => {
    nav.classList.toggle('open');
    btn.classList.toggle('active')
}


//br削除
const mqBr = window.matchMedia('(max-height : 630px)');
const brHTML = '<br>';
const indent = document.querySelectorAll('.indent');

const deleteBr = () => {
    document.querySelectorAll('.hero br').forEach((e) => {
        e.remove();
    })
}

const addBr = () => {
    indent.forEach((e) => {
        e.insertAdjacentHTML("beforebegin", brHTML)
    });
}

const checkBr = () => {
    const hasBr = document.querySelectorAll('.hero br').length !== 0;

    if (mqBr.matches && hasBr) {
        deleteBr();
    } else if (!mqBr.matches && !hasBr) {
        addBr();
    }
}

// triangle移動
const hero = document.querySelector('.hero');
const subTitle = document.querySelector('.sub-title')
const mqTri = window.matchMedia('(max-width:1024px), (max-height:630px)');
const triangle = document.querySelector('.triangle')

const moveTriangle = () => {
    if (mqTri.matches) {
        subTitle.appendChild(triangle)
    } else {
        hero.appendChild(triangle)
    }
}

// ナビのクラス削除

const navLinks = document.querySelectorAll('.page-nav li a');
const mqNav = window.matchMedia('(max-width: 1000px)');

const toggleNavlinks = () => {
    navLinks.forEach((e) => {
        e.classList.toggle('inversion', !mqNav.matches);
    });
}
// 実行
window.addEventListener('DOMContentLoaded', () => {
    checkBr();
    moveTriangle();
    toggleNavli();
});

btn.addEventListener('click', moveNav);
mqBr.addEventListener('change', checkBr);
mqTri.addEventListener('change', moveTriangle);
mqNav.addEventListener('change', toggleNavli);
