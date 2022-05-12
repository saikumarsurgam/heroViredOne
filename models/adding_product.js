const mongoose = require('mongoose');
const { stringify } = require('querystring');
const addingProduct = new mongoose.Schema(
    {
        product_Name:{
            type:String,
            require:true
        },
        Description:{
            type:String,
            require:true,
        },
        category:{
            type:String,
            require:true,
        },
        ExpireDate:{
            type:Number,
            require:true,
        },
        UnitsInStock:{
            type:Number,
            require:true,
        },
        
    });

module.exports = mongoose.model("addingProduct" , addingProduct);