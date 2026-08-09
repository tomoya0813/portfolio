'use strict'

const ltContainer = document.getElementById('lt-container');
const learningContainer = document.getElementById('learning-container');
const journeyContainer = document.getElementById('journey-container');

fetch("../data/data.json")
    .then(response => {
        if (!response.ok) throw new Error('サーバーエラー');
        return response.json()
    })
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
        const journeyHTML = [...journey]
            .reverse()
            .map(journeyItem =>
                `<div class="journey-item">
                        <p class="date">${journeyItem.date}</p>
                        <p class="journey-text">${journeyItem.text}</p>
                </div>`)
            .join('');
        journeyContainer.insertAdjacentHTML('beforeend', journeyHTML);
    })
    .catch(error => {
        console.error('エラー内容', error);
        window.alert('データ取得に失敗しました')
    })