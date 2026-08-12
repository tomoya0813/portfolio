const express = require('express');
const app = express();
const Port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));


app.post('/contact', (req, res) => {
    console.log('post到着')
    console.log(req.body);
    res.send('this is test message')
})

app.listen(Port, '0.0.0.0', () => {
    console.log('サーバー起動')
})

