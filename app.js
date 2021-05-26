const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const { Console } = require('console');

const fs = require('fs');

const app = express();

const port = 6789;

// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');
// suport pentru layout-uri - implicit fișierul care reprezintă template-ul site-ului este views/layout.ejs
app.use(expressLayouts);
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public/'));
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
app.use(bodyParser.urlencoded({ extended: true }));


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

app.get('/contact.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/contact.html');
});

app.get('/admin', (req,res) => {	

    /*
	if (req.session.role == "admin") {
		res.render('admin',{ session: req.session});
	} else {
		res.send("No acces");
	}
    */

    res.render('admin');
});


app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));