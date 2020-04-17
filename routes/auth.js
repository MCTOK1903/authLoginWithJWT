const router = require('express').Router();
const User = require('../Model/User');
const {registerValidation,loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    //validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

    //checking if the user is already exist in the db
    const emailExist = await User.findOne({
        email : req.body.email
    });
    if (emailExist) return res.status(400).send('Email already exist');

    //hash the pass
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);



    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    }); 
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (error) {
        res.status(400).send(error);
    }

});


router.post('/login',async (req,res) => {
    //validation
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //checking if the email exist
    const user = await User.findOne({
        email: req.body.email
    });
    if(!user) return res.status(400).send('Email is invalid');
    //checking pass is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('password is not match');

    //create and assing a token 
    const token = jwt.sign({_id:user._id},process.env.SECRET_TOKEN);
    res.header('auth-token',token).send(token);

});





module.exports = router;