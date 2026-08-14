const nodemailer = require('nodemailer');
const express = require('express');
require('dotenv').config();


const app = express();
const Port = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
    service: "gmail", // Shortcut for Gmail's SMTP settings - see Well-Known Services
    auth: {
        type: "OAuth2",
        user: "tomoya.portfolio.contact@gmail.com",
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    },
});

app.post('/contact', async (req, res) => {
    try {
        const info = await transporter.sendMail({
            from: "tomoya.portfolio.contact@gmail.com",
            to: "tomoya.portfolio.contact@gmail.com",
            subject: "テスト", // subject line
            text: "これはテストメッセージ", // plain text body
        });
        console.log("Message sent:", info.messageId);
        res.send('<h1>メールを送信しました</h1>');
    } catch (err) {
        console.error("Error while sending mail:", err);
        res.send('<h1>メールを送信できませんでした</h1>')
    }
})




app.listen(Port, '0.0.0.0', async () => {

    try {
        await transporter.verify();
        console.log("Server is ready to take our messages");
    } catch (err) {
        console.error("Verification failed:", err);
    }

    console.log(process.env.GOOGLE_CLIENT_ID);
    console.log('サーバー起動')
})


