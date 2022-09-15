const express = require('express');
const fs = require('fs');
const fileupload = require('express-fileupload');

const { saveNews, getData, prepareNamePicture } = require(__dirname + '/actions/add_news');

const app = express();
const port = 8833;
const host = 'localhost';

const News = getData();

app.use(express.urlencoded());
app.use(fileupload());
app.set('view engine', 'ejs');

app.use('/img', express.static(__dirname + '/img'));
app.get('/', (req, res) => {
    res.render(__dirname + '/views/home', { News });
});

app.get('/add', (req, res) => {
    res.render(__dirname + '/views/add', {});
});

app.post('/add', (req, res) => {

    let namePicture = null;
    if (req.files?.picture) {
        namePicture = prepareNamePicture(req.files.picture.name);
        req.files.picture.mv(__dirname + '/img/' + namePicture);
    }

    News.push({
        ...req.body,
        date: new Date().toLocaleString(),
        id: Date.now(),
        picture: namePicture
    });
    saveNews(News);

    res.redirect('/');
});
app.get('/news/:id', (req, res) => {
    const Item = News.find(elem => elem.id == req.params.id);
    res.render(__dirname + '/views/news', { Item });
});

app.get('/*', (req, res) => {
    res.render(__dirname + '/views/page_not_found');
});
app.listen(port, host, () => {
    console.log('Server running...');
});
