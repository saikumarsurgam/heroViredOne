const mongoose = require('mongoose');

const adminData = new mongoose.Schema(
    {
        useremail:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true,
        }
        
    });

module.exports = mongoose.model("adminData" , adminData);
