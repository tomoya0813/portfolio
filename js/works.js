'use strict'

const container = document.getElementById('container');
const get = sessionStorage.getItem("works");

const createWorks = (works) => {
  const addHTML = works
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
};

// createWorks実行
if (get) {
  createWorks(JSON.parse(get));
  console.log(1)
} else {
  fetch("../data/data.json")
    .then(response => response.json())
    .then(data => {
      sessionStorage.setItem("works", JSON.stringify(data.works));
      createWorks(data.works)
    });
  console.log(2)
}
