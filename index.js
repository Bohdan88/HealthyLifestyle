const express = require('express')
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const config = require('./config')
const staticAsset = require('static-asset')

const routes = require('./routes')

// connect to MongoDB
mongoose.Promise = global.Promise;


mongoose.connection
    .on('error', error => console.log(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => {
        const info = mongoose.connections[0];
        console.log(`Connected to ${info.host}: ${info.port}/${info.name} `);

    })





mongoose.connect('mongodb://localhost/databaseChat',  { useNewUrlParser: true ,
    useCreateIndex: true})



app.use(staticAsset(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use('/javascripts', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

app.get('/', (req,res) => {
    res.render('index')
})

app.use('/api/auth/', routes.auth)

//app.post('/', (req,res) => {
//    res.render('index')
//    console.log(req.body)
//})


// catch 404 and forward to error handler



app.listen(2002, () => console.log('Example app'))