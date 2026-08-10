'use strict'

const ltContainer = document.getElementById('lt-container');
const learningContainer = document.getElementById('learning-container');
const journeyContainer = document.getElementById('journey-container');

const createAbout = async () => {

    const data = await getData();

    // Language & Tools挿入
    const lt = data.about.skills.languageAndTools;
    const ltHTML = lt
        .map(ltItem =>
            `<li class="lt">${ltItem}</li>`
        )
        .join('');
    ltContainer.insertAdjacentHTML('beforeend', ltHTML);

    // Learning挿入
    const learning = data.about.skills.learning;
    const learningHTML = learning
        .map(learningItem =>
            `<li class="lt learning">${learningItem}</li>`)
        .join('');
    learningContainer.insertAdjacentHTML('beforeend', learningHTML);

    // Journey挿入
    const journey = data.about.journey;
    const journeyHTML = [...journey]
        .reverse()
        .map(journeyItem =>
            `<div class="journey-item">
                        <p class="date">${journeyItem.date}</p>
                        <p class="journey-text">${journeyItem.text}</p>
                </div>`)
        .join('');
    journeyContainer.insertAdjacentHTML('beforeend', journeyHTML);
}

createAbout();