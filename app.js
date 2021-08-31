const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');

const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/users/signin', (req, res) => {
    res.render('signIn');
});

app.get('/app', (req, res) => {
    res.render('app');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000	');
});
