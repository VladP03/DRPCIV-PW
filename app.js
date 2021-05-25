const express = require('express');
const fs = require('fs');

const app = express();

const port = 6789;

// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public/'));

// facem redirect catre pagina principala (home)
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/home.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/home.html');
});

app.get('/about.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/about.html');
});

app.get('/contact.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/contact.html');
});


app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));