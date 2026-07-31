'use strict'

const container = document.getElementById('container');
fetch("../data/data.json")
  .then(response => response.json())
  .then(data => {
    const works = data.works;
    works.forEach(e => {

      const techs = (e.tech || [])
        .map(techName => `<span class="tech-tag">${techName}</span>`)
        .join('');

      const imgSrc = `../${e.imgSrc}`

      const addHTML = ` <div class="works-item">                          
                            <p class="works-title">${e.title}</p>
                              ${techs}
                            <img src="${imgSrc}" alt="${e.imgAlt}">
                            <p class="works-text">${e.text}</p>
                          <div class="btn-wrapper">
                              <a href="${e.link}" class="demo btn">View Demo</a>
                              <a href="${e.githubLink}" class="github btn">Github Code</a>
                          </div>
                        </div>`

      container.insertAdjacentHTML('beforeend', addHTML);

    });
  });