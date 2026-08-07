'use strict'

const defaultSetting = {
    height: 300,
    width: 300,
    opacity: 1,
    borderRadius: 50,
    borderColor: 'currentcolor',
    backgroundColor: 'inherit',
    borderWidth: 2,

    minuteHand: {
        width: 140,
        height: 2,
        opacity: 1,
        color: "black"
    },

    hourHand: {
        width: 100,
        height: 2,
        opacity: 1,
        color: "black"
    },

    secondHand: {
        width: 140,
        height: 1,
        opacity: 1,
        color: "black"
    }
};

const createClock = (setting = {}) => {

    const config = {
        ...defaultSetting,
        ...setting,

        minuteHand: {
            ...defaultSetting.minuteHand,
            ...(setting.minuteHand ?? {})
        },

        hourHand: {
            ...defaultSetting.hourHand,
            ...(setting.hourHand ?? {})
        },

        secondHand: {
            ...defaultSetting.secondHand,
            ...(setting.secondHand ?? {})
        }
    };



    const clockElement = document.createElement('div');
    const minuteHand = document.createElement('span');
    const hourHand = document.createElement('span');
    const secondHand = document.createElement('span');

    clockElement.classList.add('clock-object');
    minuteHand.classList.add('minute-hand');
    hourHand.classList.add('hour-hand');
    secondHand.classList.add('second-hand')

    clockElement.style.setProperty('--clock-height', `${config.height}px`);
    clockElement.style.setProperty('--clock-width', `${config.width}px`);
    clockElement.style.setProperty('--clock-color', `${config.borderColor}`);
    clockElement.style.setProperty('--clock-radius', `${config.borderRadius}%`);
    clockElement.style.setProperty('--clock-bg', `${config.backgroundColor}`);
    clockElement.style.setProperty('--clock-bw', `${config.borderWidth}px`);
    clockElement.style.setProperty('--clock-opacity', `${config.opacity}`);

    minuteHand.style.setProperty('--minute-width', `${config.minuteHand.width}px`);
    minuteHand.style.setProperty('--minute-height', `${config.minuteHand.height}px`);
    minuteHand.style.setProperty('--minute-color', `${config.minuteHand.color}`);
    minuteHand.style.setProperty('--minute-opacity', `${config.minuteHand.opacity}`);

    hourHand.style.setProperty('--hour-width', `${config.hourHand.width}px`);
    hourHand.style.setProperty('--hour-height', `${config.hourHand.height}px`);
    hourHand.style.setProperty('--hour-color', `${config.hourHand.color}`);
    hourHand.style.setProperty('--hour-opacity', `${config.hourHand.opacity}`);

    secondHand.style.setProperty('--second-width', `${config.secondHand.width}px`);
    secondHand.style.setProperty('--second-height', `${config.secondHand.height}px`);
    secondHand.style.setProperty('--second-color', `${config.secondHand.color}`);
    secondHand.style.setProperty('--second-opacity', `${config.secondHand.opacity}`)


    clockElement.append(minuteHand, hourHand, secondHand);

    const tickTime = () => {
        const nowTime = new Date();
        const angleOfMinuteHand = nowTime.getMinutes() * 6 - 90;
        const angleOfHourHand = (nowTime.getHours() % 12) * 30 + nowTime.getMinutes() * 0.5 - 90;
        const angleOfSecondHand = (nowTime.getSeconds() + nowTime.getMilliseconds() / 1000) * 6 - 90;
        minuteHand.style.setProperty('--minute-transform', `rotate(${angleOfMinuteHand}deg)`);
        hourHand.style.setProperty('--hour-transform', `rotate(${angleOfHourHand}deg)`);
        secondHand.style.setProperty('--second-transform', `rotate(${angleOfSecondHand}deg)`)
    }

    const update = () => {
        tickTime();
        requestAnimationFrame(update);
    };

    if (config.secondHand.opacity > 0) {
        requestAnimationFrame(update);
    } else {
        tickTime();
        setInterval(tickTime, 1000);
    }
    return clockElement;
}
