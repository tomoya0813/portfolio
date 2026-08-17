'use strict'
const subject = 'お問い合わせ'

const info = document.querySelectorAll("input,textarea")

const geneInf = () => {
    const mailtoOption = [];
    for (let i = 0; i < info.length; i++) {
        mailtoOption.push(`${info[i].id}: ${info[i].value}`)
    }
    return mailtoOption.join("%0D%0A")
}


document.addEventListener('submit', (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:tomoya.portfolio.contact@gmail.com?subject=${subject}&body=${geneInf()}`
    window.open(mailtoUrl, '_blank');
    location.href = "next.html"
})






