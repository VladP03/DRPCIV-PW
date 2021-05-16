const express = require('express');
const fs = require('fs');

const app = express();

const port = 6789;

app.use(express.static('public/'));

// facem redirect catre pagina principala (home)
app.get('/', function(req, res) {
    res.redirect('/home');
});

app.get('/home', function(req, res) {
    res.sendFile(__dirname + '/public/html/home.html');
});

app.get('/about', function(req, res) {
    res.sendFile(__dirname + '/public/html/about.html');
});

app.get('/contact', function(req, res) {
    res.sendFile(__dirname + '/public/html/contact.html');
});


app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));