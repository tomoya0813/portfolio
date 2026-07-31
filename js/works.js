'use strict'

const container = document.getElementById('container');
fetch("../data/data.json")
  .then(response => response.json())
  .then(data => {
    const works = data.works;
    works.forEach(e => {

      const imgSrc = `../${e.imgSrc}`

      const addHTML = ` <div class="works-item">
                            <p class="works-title">${e.title}</p>
                            <img src="${imgSrc}" alt="${e.imgALT}">
                            <p class="works-text">${e.text}</p>
                          <div class="btn-wrapper">
                              <a href="${e.link}" class="demo btn">Viwe Demo</a>
                              <a href="${e.githubLink}" class="github btn">Github Code</a>
                          </div>
                        </div>`

      container.insertAdjacentHTML('beforeend', addHTML);

    });
  });