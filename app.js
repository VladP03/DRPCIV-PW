const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const { Console } = require('console');
const cookieParser=require('cookie-parser');

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

app.use(cookieParser());

// facem redirect catre pagina principala (home)
app.get('/', function(req, res) {
    res.redirect('/home');
});

app.get('/home', function(req, res) {
    res.render('home', {utilizator: req.cookies.utilizator});
});

app.get('/contact', function(req, res) {
    res.render('contact', {utilizator: req.cookies.utilizator});
});

app.post('/contact-confirm', (req, res) => {
	res.render("contact-confirm", {utilizator: req.cookies.utilizator, body: req.body})
});

app.get('/login', function(req, res) {
    res.clearCookie('utilizator');

    res.render('login', {utilizator: req.cookies.utilizator});
});

app.get('/logout', function(req, res) {
    res.clearCookie('utilizator');

    res.redirect('/home');
});

app.post('/verificare-autentificare', (req,res) => {

    console.log(req.body);

	const fs = require('fs');	
	fs.readFile('utilizatori.json', (err, data) => {
		if (err) throw err;
		let listaUseri = JSON.parse(data);

		let ok =0;
		for (let i=0;i<listaUseri.length;i++) {

			if (listaUseri[i].username == req.body.user && listaUseri[i].password == req.body.pass) {
				ok=1;

				res.cookie("utilizator", listaUseri[i].username);

                if (listaUseri[i].role == "admin") {
                    res.sendFile(__dirname + '/public/html/admin.html');
                } else {
				    res.redirect('http://localhost:6789/');
                }
			}
		}

		if (ok == 0) {
			res.cookie("utilizator", "mesajEroare");

			res.redirect('http://localhost:6789/login');
		}
	})
});

let listaIntrebari;
app.get('/chestionar', function(req, res) {

	fs.readFile('intrebari.json', (err, data) => {
		if (err) throw err;
		listaIntrebari = JSON.parse(data);

		// în fișierul views/chestionar.ejs este accesibilă variabila 'intrebari' care conține vectorul de întrebări
		res.render('chestionar', {intrebari: listaIntrebari, utilizator: req.cookies.utilizator});
	});
});

app.post('/rezultat-chestionar', (req, res) => {

		if(listaIntrebari) {
			const respunsuriPrimite = req.body;

			let numarRaspunsuriCorecte = 0;
	
			for (let i=0;i<listaIntrebari.length;i++) {
				const elementKey = i + '_' + listaIntrebari[i].corect;
				if (respunsuriPrimite[i] == elementKey) {
					numarRaspunsuriCorecte++;
				}
			}
			
			res.render("rezultat-chestionar", { 'corecte' : numarRaspunsuriCorecte, 'total' :  listaIntrebari.length, utilizator: req.cookies.utilizator});
		}
});

/* Partea de AJAX */

app.get('/admin.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/admin.html');
});

app.get('/adminHome.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/adminHome.html');
});

app.get('/adminRules.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/adminRules.html');
});

/* ************ */


app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));