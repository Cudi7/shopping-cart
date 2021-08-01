const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const indexController = require('./controllers/indexController');
const connectDb = require('./config/db');

//Initial configuration
dotenv.config({ path: './config/.env' }); //loads .env file
const app = express(); //inits express app
app.set('view engine', 'ejs'); // setting up ejs view engine
connectDb();

//Middleware
app.use(helmet()); //Helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(cors()); //enables cors
app.use(morgan('dev')); //logger for the request
app.use(express.json()); // parse and convert request body to JSON (for PUT/PATCH and POST method)
app.use(express.urlencoded({ extended: true })); // the same as express.json(), but, it also converts FORM-DATA to JSON

//Initial app routing
app.use('/products', indexController);

app.get('/', (req, res) => res.render('index'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, (req, res) =>
  console.log(`Server up and running on PORT: ${PORT}`)
);
