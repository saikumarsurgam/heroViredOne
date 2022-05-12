const mongoose=require('mongoose');
const Ecommerce =mongoose.Schema;//database
const Users = new mongoose.Schema({//users collection no 1
    user_name:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    wallet:{
        type:Double,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },

});
modules.exports=mongoose.model('Users',Users);