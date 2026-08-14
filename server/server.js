const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const Port = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
    service: "gmail", // Shortcut for Gmail's SMTP settings - see Well-Known Services
    auth: {
        type: "OAuth2",
        user: "tomoya.portfolio.contact@gmail.com",
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
});
try {
    await transporter.verify();
    console.log("Server is ready to take our messages");
} catch (err) {
    console.error("Verification failed:", err);
}

app.post('/contact', async (req, res) => {
    console.log('post到着')
    console.log(req.body);

    try {
        const info = await transporter.sendMail({
            from: "tomoya.portfolio.contact@gmail.com",
            to: "tomoya.portfolio.contact@gmail.com",
            text: ` 
                名前: ${req.body.name}
                メール: ${req.body.email}
                内容: ${req.body.message}
                `,
            replyTo: req.body.email
        })

        console.log("Message sent: %s", info.messageId);
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
    res.send('this is test message')
})

app.get('/oauth2callback', (req, res) => {
    console.log(req.query.code)
    res.send(req.query.code)

})

app.listen(Port, '0.0.0.0', () => {
    console.log(process.env.GOOGLE_CLIENT_ID);
    console.log('サーバー起動')
})


