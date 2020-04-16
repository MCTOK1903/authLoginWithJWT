const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

//import Routes
const authRoute = require('./routes/auth');

mongoose.connect(
    process.env.DB_CONNECT, 
    { useNewUrlParser: true },
    () => console.log('connect to DB!')
);

//middleware
app.use(express.json());

app.use('/api/user',authRoute);







app.listen(3000);