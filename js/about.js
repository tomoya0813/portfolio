'use strict'

const ltContainer = document.getElementById('lt-container');
const learningContainer = document.getElementById('learning-container');
const journeyContainer = document.getElementById('journey-container');

fetch("../data/data.json")
    .then(response => response.json())
    .then(data => {

        const lt = data.about.skills.languageAndTools;
        const ltHTML = lt
            .map(ltItem =>
                `<li class="lt">${ltItem}</li>`
            )
            .join('');

        ltContainer.insertAdjacentHTML('beforeend', ltHTML);


        const learning = data.about.skills.learning;
        const learningHTML = learning
            .map(learningItem =>
                `<li class="lt learning">${learningItem}</li>`)
            .join('');
        learningContainer.insertAdjacentHTML('beforeend', learningHTML);

        const journey = data.about.journey;
        const journeyHTML = journey
            .map(journeyItem =>
                `<p>
                     <span class="date">${journeyItem.date}</span><br>
                     <span class="text">${journeyItem.text}</span>
                 </p>`)
            .join('');
        journeyContainer.insertAdjacentHTML('beforeend', journeyHTML);
    });