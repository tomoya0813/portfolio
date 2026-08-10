'use strict'
// 時計設定
document.querySelector('.bg').append(createClock({
    height: 500,
    width: 500,
    opacity: 0.3,
    borderRadius: 50,
    borderColor: '#4784BF',
    backgroundColor: '#4783bf62',
    borderWidth: 2,

    minuteHand: {
        width: 230,
        height: 5,
        opacity: 1,
        color: "#4784BF"
    },

    hourHand: {
        width: 170,
        height: 5,
        opacity: 1,
        color: "#4784BF"
    },

    secondHand: {
        width: 230,
        height: 2,
        opacity: 1,
        color: "#4784BF"
    }
}));

// works取り込み
const worksContainer = document.querySelector('.splide__list');

const loadWorks = async () => {
    const data = await getData('data/data.json');
    const worksHTML = data.works
        .map(work =>
            `<li class="splide__slide"><img src="${work.imgSrc}" alt ="${work.imgAlt}"></li>`
        )
        .join('');
    worksContainer.insertAdjacentHTML('beforeend', worksHTML);

    new Splide('.splide', {
        type: 'loop',
        rewind: true,
        autoplay: true,
        interval: 5000
    }).mount();
};

loadWorks();

