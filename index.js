const express = require('express')
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const config = require('./config')
const staticAsset = require('static-asset')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const port = process.env.PORT || 2003
const MONGO_URL = 'mongodb://Bohdan:azaza1488@ds131954.mlab.com:31954/heroku_nchspl5d'


const routes = require('./routes')


// connect to MongoDB
mongoose.Promise = global.Promise;


mongoose.connection
    .on('error', error => console.log(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => {
        const info = mongoose.connections[0];
        console.log(`Connected to ${info.host}: ${info.port}/${info.name} `);
      // require('./mocks')();
    })



mongoose.connect(MONGO_URL ,  { useNewUrlParser: true ,
      useCreateIndex: true});

//mongoose.connect('mongodb://localhost/databaseChat',  { useNewUrlParser: true ,
 //   useCreateIndex: true})

// sessions

app.use(
    session({
        secret:'randomPhrase',
        resave:true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection

        })
    })
);

app.use(staticAsset(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use('/uploads',express.static(path.join(__dirname, config.DESTINATION)))

app.use('/javascripts', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

app.get('/', (req,res) => {
    const id = req.session.userId;
    const login = req.session.userLogin;
    res.render('index', {
        user: {
            id,
            login
        }
    })
});


app.get('/help', (req,res) => {
    const id = req.session.userId;
    const login = req.session.userLogin;
    res.render('help/help', {
        user: {
            id,
            login
        }
    })
});



// routes
app.use('/api/auth/', routes.auth)
app.use('/post', routes.post);
app.use('/', routes.archive);
app.use('/comment', routes.comment);
app.use('/upload', routes.upload)

//app.use('/help', routes.help)








//app.post('/', (req,res) => {
//    res.render('index')
//    console.log(req.body)
//})


// catch 404 and forward to error handler



app.listen( port, () => console.log('Example app'))
