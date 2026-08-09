'use strict'

const container = document.getElementById('container');
const get = sessionStorage.getItem("works");

const createWorks = (works) => {
  const addHTML = [...works]
    .reverse()
    .map(worksItem => {

      const techs = (worksItem.tech)
        .map(techName =>
          `<span class="tech-tag">${techName}</span>`)
        .join('');

      const imgSrc = `../${worksItem.imgSrc}`

      return `<div class="works-item">                          
                  <p class="works-title">${worksItem.title}</p>
                  ${techs}
                  <img src="${imgSrc}" alt="${worksItem.imgAlt}">
                  <p class="works-text">${worksItem.text}</p>
      
                  <div class="btn-wrapper">
                    <a href="${worksItem.demoLink}" class="demo btn" target="_blank">View Demo</a>
                    <a href="${worksItem.githubLink}" class="github btn" target="_blank">Source Code</a>
                  </div>
                 </div>`
    })
    .join('')

  container.insertAdjacentHTML('beforeend', addHTML);
  // item奇数時の処理

  const isOddNumber = works.length % 2 === 1;

  if (isOddNumber) {
    const soonHTML = `<div class="works-item soon">
                      <img src="../img/chara_trans.png" alt="水色のオリジナルキャラクターのイラスト">
                      <p class="soon-text">Coming Soon</p>
                    </div>`;

    container.insertAdjacentHTML('beforeend', soonHTML)
  }
};

// createWorks実行
if (get) {
  createWorks(JSON.parse(get));
} else {
  fetch("../data/data.json")
    .then(response => {
      if (!response.ok) throw new Error('サーバーエラー');
      return response.json();
    })
    .then(data => {
      sessionStorage.setItem("works", JSON.stringify(data.works));
      createWorks(data.works)
    })
    .catch(error => {
      window.alert('データ取得に失敗しました')
      console.error('エラー内容', error)
    })
}
