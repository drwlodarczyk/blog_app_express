const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const postsPath = path.join(__dirname, 'data/posts.json');

// Ustawienie EJS i ścieżek
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Trasa główna (renderuje posty)
app.get('/', (req, res) => {
    const posts = JSON.parse(fs.readFileSync(postsPath));
    res.render('index', { posts });
});