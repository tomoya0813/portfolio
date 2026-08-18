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

const topPage = document.getElementById('top-page-name');


const checkCurrentTag = () => {
    if (currentTag === null || topPage) return;

    currentTag.classList.toggle('currentpage', !mqCt.matches);
}


window.addEventListener('DOMContentLoaded', () => {
    checkCurrentTag();
});

mqCt.addEventListener('change', () => {
    checkCurrentTag();
});

// データ取得関数定義
const getData = async (path) => {
    const hasData = sessionStorage.getItem('data');

    if (hasData) {
        return JSON.parse(hasData)
    }
    else {
        try {
            const response = await fetch(path)
            if (!response.ok) throw new Error('サーバーエラー');

            const data = await response.json();

            sessionStorage.setItem('data', JSON.stringify(data));
            return data

        } catch (error) {
            window.alert('データ取得に失敗しました。');
            console.error('エラー内容', error);
        }
    }
}

//ページ遷移アニメーション ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

const isPageTransitioned = sessionStorage.getItem('transition') ?
    true : false;
let isTransitioning = false;



const animeHtml = isPageTransitioned ?
    `<div class="page full"></div>`
    : `<div class="page"></div>`;
document.querySelector('main').insertAdjacentHTML('beforeend', animeHtml);

// タブの開かないaタグ対象、worksitemはこの時点で存在しないため対象外
const pageNode = document.querySelector('.page');
const pageLinks = document.querySelectorAll('a:not([target="_blank"])');


const handleCurrentPageClick = (e) => {
    e.preventDefault();
    nav.classList.remove('open');
    btn.classList.remove('active');
}

// request・・・ で描画を遅らせる
document.addEventListener('DOMContentLoaded', () => {
    if (isPageTransitioned) {
        sessionStorage.removeItem('transition')
        requestAnimationFrame(() => {
            pageNode.classList.remove('full');
        });
    }
})

// ブラウザ戻りの処理
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        document.body.style.pointerEvents = '';
        isTransitioning = false;
        pageNode.classList.remove('full');
    }
})

pageLinks.forEach((a) => {
    // console.log(a)
    a.addEventListener('click', (e) => {
        if (isTransitioning) return;


        const isCurrentPageLink = e.currentTarget.closest('#currentpage');
        // console.log(isCurrentPageLink)
        // console.log(e.target, e.currentTarget)
        if (isCurrentPageLink) {
            handleCurrentPageClick(e);
            return;
        }


        document.body.style.pointerEvents = 'none'
        isTransitioning = true;


        const targetHref = e.currentTarget.href;
        e.preventDefault();
        pageNode.classList.add('full');


        pageNode.addEventListener('transitionend', () => {
            sessionStorage.setItem('transition', 'true');
            // console.log(sessionStorage);
            location.href = targetHref;
        }, { once: true })
    })
})

//ページ遷移アニメ ===============================================================