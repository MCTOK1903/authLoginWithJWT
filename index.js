const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose'); 

dotenv.config();

//import Routes
const authRoute = require('./routes/auth');
const postsRoute= require('./routes/potsts');
 
mongoose.connect(
    process.env.DB_CONNECT, 
    { useNewUrlParser: true },
    () => console.log('connect to DB!')
);

//middleware
app.use(express.json());

app.use('/api/user',authRoute);
app.use('/api/posts',postsRoute)






app.listen(3000);