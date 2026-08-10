'use strict'

const container = document.getElementById('container');

//works取り込み
const createWorks = async () => {
  const data = await getData('../data/data.json');

  const addHTML = [...data.works]
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

  const isOddNumber = data.works.length % 2 === 1;

  if (isOddNumber) {
    const soonHTML = `<div class="works-item soon">
                      <img src="../img/chara_trans.png" alt="水色のオリジナルキャラクターのイラスト">
                      <p class="soon-text">Coming Soon</p>
                    </div>`;

    container.insertAdjacentHTML('beforeend', soonHTML)
  }
};

createWorks();
