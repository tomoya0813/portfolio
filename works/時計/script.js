'use strict'

const defaultSetting = {
    height: 300,
    width: 300,
    borderRadius: 50,
    borderColor: 'currentcolor',
    backgroundColor: 'inherit',
    borderWidth: 2,
    hands: {
        min: {
            width: 140,
            height: 2,
            color: "black"
        },
        hour: {
            width: 100,
            height: 2,
            color: "black"
        }
    }
};

const createClock = (setting = defaultSetting) => {

    const handsetting = Object.assign({}, defaultSetting.hands, setting)
    const config = Object.assign({}, defaultSetting, setting);


    const clockElement = document.createElement('div');
    const minutesHand = document.createElement('span');
    const hoursHand = document.createElement('span');

    clockElement.classList.add('clock-Object');
    minutesHand.classList.add('minutes-hand');
    hoursHand.classList.add('hours-hand');

    clockElement.style.setProperty('--clock-height', `${config.height}px`);
    clockElement.style.setProperty('--clock-width', `${config.width}px`);
    clockElement.style.setProperty('--clock-color', `${config.borderColor}`);
    clockElement.style.setProperty('--clock-radius', `${config.borderRadius}%`);
    clockElement.style.setProperty('--clock-bg', `${config.backgroundColor}`);
    clockElement.style.setProperty('--clock-bw', `${config.borderWidth}px`);

    minutesHand.style.setProperty('--min-width', `${config.hands.min.width}px`);
    minutesHand.style.setProperty('--min-height', `${config.hands.min.height}px`);
    minutesHand.style.setProperty('--min-color', `${config.hands.min.color}`);

    hoursHand.style.setProperty('--hour-width', `${config.hands.hour.width}px`);
    hoursHand.style.setProperty('--hour-height', `${config.hands.hour.height}px`);
    hoursHand.style.setProperty('--hour-color', `${config.hands.hour.color}`);

    clockElement.append(minutesHand, hoursHand);

    const tickTime = () => {
        const nowTime = new Date();
        const angleOfMinutesHand = nowTime.getMinutes() * 6 - 90;
        const angleOfHoursHand = (nowTime.getHours() % 12) * 30 + nowTime.getMinutes() * 0.5 - 90;
        minutesHand.style.setProperty('--transform', `rotate(${angleOfMinutesHand}deg)`)
        hoursHand.style.setProperty('--transform', `rotate(${angleOfHoursHand}deg)`)
    }

    tickTime();
    const clockSettimer = setInterval(tickTime, 60000);
    return clockElement;
}
