const express = require('express');/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var app = express();
const nodemailer = require("nodemailer");
const session = require('express-session');
const formidable = require('formidable');


const fs = require('fs');
const crypto = require('crypto');

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.use('/css', express.static('css'));
app.use('/poze', express.static('poze'));

app.use(session({
  secret: 'abcdefg',//folosit de express session pentru criptarea id-ului de sesiune
  resave: true,
  saveUninitialized: false
}));

function saveJson(obJson, numeFis){
	let data = JSON.stringify(obJson);//transform in JSON
	fs.writeFileSync(numeFis, data);//scriu JSON-ul in fisier (inlocuind datele vechi)
}

function getJson(numeFis){
	let textFis = fs.readFileSync(numeFis);//pun continutul fisierului useri.json in rawdata
	return JSON.parse(textFis);//obtin obiectul asociat json-ului
}

async function trimiteMail(username, email) {
	  let transporter = nodemailer.createTransport({
		service: 'gmail',

    secure: false,
    auth: {
      user: "test.proiect123@gmail.com", //mailul site-ului (de aici se trimite catre user)
      pass: "SevRAi5m84gQSQr" 
    },
	    tls: {
        rejectUnauthorized: false//pentru gmail
    }
  });
  //trimitere mail
  let info = await transporter.sendMail({
    from: '"test.proiect123" <test.proiect123@gmail.com>',
    to: email,
    subject: "User nou", 
    text: "salut, "+username, 
    html: "<p>salut, "+username+"</p>" 
  });
  
  console.log("Message sent: %s", info.messageId);
}


app.get('/', function(req, res) {

	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/index',{user: req.session.username});
	
	
	
	
	
});

app.get('/index', function(req, res) {

	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/index',{user: req.session.username});
	
	
	
	
	
});

app.get('/login', function(req, res) {
	
	res.render('html/login');
	
});

app.post('/login', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {

		
		jsfis=getJson('useri.json')
		var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');//creez un obiect de tip cifru cu algoritmul aes
		var encrParola= cifru.update(fields.parola, 'utf8', 'hex');//cifrez parola
		encrParola+=cifru.final('hex');//inchid cifrarea (altfel as fi putut adauga text nou cu update ca sa fie cifrat
		let user=jsfis.useri.find(function(x){//caut un user cu acelasi nume dat in formular si aceeasi cifrare a parolei
			
			return (x.username==fields.username&& x.parola == encrParola );
		});
		if(user){
			console.log(user);
			console.log(user.parola);
			console.log(encrParola);
			req.session.username=user;//setez userul ca proprietate a sesiunii
		}
		
		console.log(req.session.username);
		/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
		res.render('html/index',{user: req.session.username});
	});


});

app.get('/signup', function(req, res) {
	
	res.render('html/signup');
	
});

app.post('/signup', (req, res) => {
	
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {

		let rawdata = fs.readFileSync('useri.json');
		let jsfis = JSON.parse(rawdata);
		var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');
		var encrParola= cifru.update(fields.parola, 'utf8', 'hex');
		encrParola+=cifru.final('hex');
		console.log(fields.parola+ " "+encrParola);
		jsfis.useri.push({id:jsfis.lastId, username:fields.username, email: fields.mail, parola: encrParola});
		jsfis.lastId++;
		res.render('html/signup', {user: req.session.username, rsstatus:"ok"});

		saveJson(jsfis,'useri.json');
		trimiteMail(fields.username, fields.email);
		console.log("das");
    });
	
});

app.get('/shop', function(req, res) {

	let rawdata = fs.readFileSync('items.json');
	let jsfis = JSON.parse(rawdata);
	console.log(jsfis.items);
	
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/shop',{items:jsfis.items,items2:jsfis.items2,user: req.session.username});
	
});

app.get('/aboutus', function(req, res) {

	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/aboutus',{user: req.session.username});
	
});

app.get('/contact', function(req, res) {

	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/contact',{user: req.session.username});
	
});

app.get('/delivery', function(req, res) {

	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/delivery',{user: req.session.username});
	
});

app.get('/marimi', function(req, res) {

	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/marimi',{user: req.session.username});
	
});

app.get('/logout', function(req, res){
	req.session.destroy();//distrug sesiunea cand se intra pe pagina de logout
	res.render('html/index');
});

app.use(function(req,res){
    res.status(404).render('html/404');
});

app.listen(8080);
console.log('8080 is the magic port');