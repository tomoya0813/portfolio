'use strict';
/* ハンバーガーメニュー*/
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.site-nav');


const toggleMenu = () => {
    menu.classList.toggle('active');
    hamburger.classList.toggle('open');
}

const closeMenu = () => {
    menu.classList.remove('active');
    hamburger.classList.remove('open');
}


hamburger.addEventListener('click', toggleMenu);
menu.addEventListener('click', closeMenu);

/*star*/
const star = document.querySelectorAll('.star');
const starMove = () => {
    star.forEach(item => {
        if (document.body.classList.contains('light')) {
            return;
        }
        else if (item.classList.contains('move')) {
            return;
        } else if (Math.random() < 0.3) {
            setTimeout(() => {
                item.classList.add('move');
                setTimeout(() => {
                    item.classList.remove('move');
                }, 4000);
            }, 500 + Math.random() * 1000)
        }
    });
}
setInterval(starMove, 2000);

/*rain*/
const rain = document.querySelectorAll('.rain');
const rainDrop = () => {
    rain.forEach(item => {
        if (!document.body.classList.contains('light')) {
            return;
        }
        else if (item.classList.contains('drop')) {
            return;
        } else if (Math.random() < 0.15) {
            item.classList.add('drop');
            setTimeout(() => {
                item.classList.remove('drop');
            }, 500)
        }
    });
}
setInterval(rainDrop, 50);

/*sectionを画面内に動かす*/
const callback = entries => {
    entries.forEach(item => {
        if (item.isIntersecting) {
            item.target.classList.add('show');
        } else {
            item.target.classList.remove('show');
        }
    });
};

const options = {
    threshold: 0.1
}

const observer = new IntersectionObserver(callback, options);

document.querySelectorAll('.translate').forEach(item => {
    observer.observe(item);
});


/*lightモード実行*/

const lightBtn = document.querySelector('.logo img');
const modeChange = () => {
    document.body.classList.toggle('light');
    lightBtn.src = document.body.classList.contains('light')
        ? "img/logo-dark.png" :
        "img/logo-light.png";
}


lightBtn.addEventListener('click', modeChange);


/*news 追加 =================== */
const container = document.getElementById('news-container');
const newsData = [
    {
        datetime: "2026-03-01",
        date: "2026.03.01",
        text: "Cafe Luneのサイトを公開しました。",
    },
    {
        datetime: "2026-04-01",
        date: "2026.04.01",
        text: "開店日が5月1日に決定しました。"
    },
    {
        datetime: "2026-05-01",
        date: "2026.05.01",
        text: "Cafe Luneがopenしました。"
    },
    {
        datetime: "2026-06-15",
        date: "2026.06.15",
        text: "セットメニューを追加しました。",
    },
]

const newsHtml = newsData.map(item =>
    `<article class="news-item">
                <time datetime="${item.datetime}">${item.date}</time>
                <p>${item.text}</p>
            </article>`
).join('');
container.insertAdjacentHTML('afterbegin', newsHtml);

/*footer　あにめ */
const umbrella = document.querySelector('.umbrella');
//const cup = document.querySelector('.cup');
const coffee = document.querySelector('.cup img');
const puddle = document.querySelector('.puddle img')
const coffeeAnime = () => {
    coffee.classList.add('fall');
    puddle.classList.add('appear');
    setTimeout(() => {
        coffee.src = "img/coffee-cup2.png";
        umbrella.classList.add('disappear');
    }, 100)
}

coffee.addEventListener('click', coffeeAnime);
