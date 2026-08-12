const express = require('express');
const app = express();
const Port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`<form action="/contact" method="POST">
    <input type="text" name="name" placeholder="名前">
    <input type="email" name="email" placeholder="メールアドレス">
    <textarea name="message" placeholder="お問い合わせ内容"></textarea>

    <button type="submit">送信</button>
</form>`);

})

app.post('/contact', (req, res) => {
    console.log(req.body);
    res.send('this is test message not submit')
})

app.listen(Port, '0.0.0.0', () => {
    console.log('サーバー起動')
})

