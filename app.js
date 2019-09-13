const  express = require('express');
const app = express();
const morgan = require('morgan');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
}));

/////////////////////////// SETTINGS ///////////////////////////

app.set('appName', 'Practica y ejercicios en Express')
app.set('port', 5000)
app.set('view engine', 'ejs')

/////////////////////////// MIDDLEWARES ///////////////////////////

function logs(req, res, next) {
   console.log(`Alguien realizo un request a: ${req.originalUrl}`);
   console.log(req.headers)
   next();
}

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded());
app.use(logs)

/////////////////////////// ROUTES ///////////////////////////

/////////////////////////// PRACTICA ///////////////////////////

app.get('/', (req, res) =>{
    const data = [{name: 'Jhon'}, {name: 'Joe'}, {name: 'Cameron'}, {name: 'Ryan'}];
    res.render('index.ejs', {people: data});
})

app.get('/user', (req, res) => {
    res.json({
        username: 'Gabriel',
        lastname: 'Fleitas'
    });
})

app.post('/user/:id', (req, res)=> {
    console.log(req.body);
    console.log(req.params)
    res.send('POST REQUEST RECEIVED');
})

app.put('/user/:id', (req, res)=> {
    console.log(req.body)
    res.send(`User ${req.params.id} updated`);
})

app.delete('/user/:userID', (req, res)=> {
    res.send(`User ${req.params.userID} deleted`);
})

/////////////////////////// EJERCICIO ///////////////////////////

app.get('/test/query', function (req, res) {
 
    let name = req.query.name = 'Gabriel',
        surname = req.query.surname = 'Fleitas';
	let saludo = "Buenos dias " + name + ' ' + surname;
 
    res.send('<h1>' + saludo + '</h1>');
    
 
});

app.post('/test/body', function (req, res) {

    let name = req.body.name = "Gabriel",
        surname = req.body.surname = "Fleitas";
    let saludo = "Hola " + name + " " + surname;
 
    res.send('<h1>'+ saludo +' </h1>');
    console.log(req.header('Authorization'))
 
});

app.use(express.static('public'))

////////////////// SERVIDOR //////////////////////////////
                                                        //
app.listen(app.get('port'), () =>{                      //
    console.log(app.get('appName'))                     //
    console.log('Server on port', app.get('port'));     //
})                                                      //
//////////////////////////////////////////////////////////