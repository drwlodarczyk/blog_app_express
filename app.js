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

app.get('/all_posts', (req, res) => {
    const posts = JSON.parse(fs.readFileSync(postsPath));
    res.render('all_posts', { posts });
});

app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    const posts = JSON.parse(fs.readFileSync(postsPath));

    const newPost = {
        id: Date.now(),
        title,
        content
    };

    posts.push(newPost);
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
    res.redirect('/');
});

app.post('/delete_all', (req, res) => {
    fs.writeFileSync(postsPath, JSON.stringify([], null, 2));
    res.redirect('/');
})