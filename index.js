const express = require('express')
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const config = require('./config')
const staticAsset = require('static-asset')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)



const routes = require('./routes')


// connect to MongoDB
mongoose.Promise = global.Promise;


mongoose.connection
    .on('error', error => console.log(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => {
        const info = mongoose.connections[0];
        console.log(`Connected to ${info.host}: ${info.port}/${info.name} `);
       // require('./mocks')()
    })





mongoose.connect('mongodb://localhost/databaseChat',  { useNewUrlParser: true ,
    useCreateIndex: true})

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
app.use('/javascripts', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

//app.get('/', (req,res) => {
//    const id = req.session.userId;
//    const login = req.session.userLogin;
//    res.render('index', {
//        user: {
//            id,
//            login
//        }
//    })
//});
//

// routes
app.use('/api/auth/', routes.auth)
app.use('/post', routes.post);
app.use('/', routes.archive);


//app.post('/', (req,res) => {
//    res.render('index')
//    console.log(req.body)
//})


// catch 404 and forward to error handler



app.listen(2002, () => console.log('Example app'))