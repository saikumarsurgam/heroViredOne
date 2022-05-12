const mongoose = require('mongoose');

const userData = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        mail:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true,
        }
        
    });

module.exports = mongoose.model("signupData" , userData);
