'use strict'
//メニューボタン
const btn = document.getElementById('btn');
const nav = document.getElementById('nav');
const moveNav = () => {
    nav.classList.toggle('open');
    btn.classList.toggle('active');
}
btn.addEventListener('click', moveNav);

// currentpageの色制御
const currentTag = document.getElementById('currentpage');
const mqCt = window.matchMedia('(max-width:1000px)');

const checkCurrentTag = () => {
    if (currentTag === null) return;

    currentTag.classList.toggle('currentpage', !mqCt.matches);
}


window.addEventListener('DOMContentLoaded', () => {
    checkCurrentTag();
});

mqCt.addEventListener('change', () => {
    checkCurrentTag();
});