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

// データ取得関数定義
const getData = async () => {
    const hasData = sessionStorage.getItem('data');

    if (hasData) {
        return JSON.parse(hasData)
    }
    else {
        try {
            const response = await fetch('../data/data.json')
            if (response.ok) throw new Error('サーバーエラー');

            const data = await response.json();

            sessionStorage.setItem('data', JSON.stringify(data));
            return data

        } catch (error) {
            window.alert('データ取得に失敗しました。');
            console.error('エラー内容', error);
        }
    }
}
