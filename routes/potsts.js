const router = require('express').Router();
const verify =  require('../routes/verifyToken');

router.get('/',verify,(req,res) => {
    res.send({posts:{title:'selam',description:'selam1'}})
    console.log(verify);   
});



module.exports=router