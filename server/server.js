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


app.post('/contact', async (req, res) => {
    try {
        const info = await transporter.sendMail({
            from: "tomoya.portfolio.contact@gmail.com",
            to: "tomoya.portfolio.contact@gmail.com",
            subject: "Hello", // subject line
            text: "Hello world?", // plain text body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
})

// app.post('/contact', async (req, res) => {
//     console.log('post到着')

//     try {
//         const info = await transporter.sendMail({
//             from: "tomoya.portfolio.contact@gmail.com",
//             to: "tomoya.portfolio.contact@gmail.com",
//             text: ` 
//                 名前: ${req.body.name}
//                 メール: ${req.body.email}
//                 内容: ${req.body.message}
//                 `,
//             replyTo: req.body.email
//         })

//         console.log("Message sent: %s", info.messageId);
//     } catch (err) {
//         console.error("Error while sending mail:", err);
//     }
//     res.send('this is test message')
// })


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


