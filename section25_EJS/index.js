import express from 'express';
import ejs from 'ejs';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const today = new Date();
const day = today.getDay();

const message = day === 6 || day === 0 ? "Hey! It's the weekend, it's time to have fun!" : "Hey! It's a Weekday, it's time to work hard!";

app.get('/', (req, res) => {
    res.render('index.ejs', {advice: message});
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});