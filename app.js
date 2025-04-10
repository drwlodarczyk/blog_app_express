const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 3000;
const postsPath = path.join(__dirname, 'data/posts.json');

// Ustawienie EJS i ścieżek
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

// Trasa główna (renderuje posty)
app.get('/', (req, res) => {
    const posts = JSON.parse(fs.readFileSync(postsPath));
    res.render('index', { posts });
});

app.post('/post', (req, res) => {
    const posts = req.body;
    const postTitle = posts.title;
    const postContent = posts.content;
})