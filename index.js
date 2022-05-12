var express = require('express');
const res = require('express/lib/response');
var app = express();
var path = require('path');


const session = require('express-session');
app.use(session({secret:'charan'}));


app.use(express.json());

var monk = require('monk');
var dbs = monk('mongodb+srv://Mani123:Mani@cluster0.gdugc.mongodb.net/Ecommerce?retryWrites=true&w=majority')
var collections = dbs.collection('Products')
const mongoose = require("mongoose");
const urlencoded = require("body-parser/lib/types/urlencoded");
mongoose.connect("mongodb+srv://Mani123:Mani@cluster0.gdugc.mongodb.net/Ecommerce?retryWrites=true&w=majority", {
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(() => {
    console.log("Successfully Connected To MongoDB Database.");
}).catch((e) => {
    console.log("Not Connected To MongoDB Database.");
})
const connection = mongoose.connection;
const signupData = require('./models/signup_schema.js');
const logindata = require('./models/login_schema.js');
const adminData = require('./models/admin_login_schema.js');
const addingProduct = require('./models/adding_Product.js');

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'admin styles/css/templatemo-style.css')));
app.use(express.static(path.join(__dirname, 'admin styles/css/bootstrap.min.css')));
app.use(express.static(path.join(__dirname, 'admin styles/css/profile.css')));
app.use(express.static(path.join(__dirname, 'admin styles/css/reports.css')));
app.use(express.static(path.join(__dirname, 'admin styles/css/fontawesome.min.css')));
app.use(express.static(path.join(__dirname, 'css/login.css')));
app.use(express.static(path.join(__dirname, 'css/util.css')));
app.use(express.static(path.join(__dirname, 'css/main.css')));


// //GET LOGIN PAGE
app.get("/loginform",function(req,res){
    res.sendFile(__dirname + "/pages/loginform.html");
});



//GET HOME PAGE
app.get("/",function(req,res){
    res.sendFile(__dirname + "/pages/index.html");
});
// --------------ADMIN--------------

//GET LOGIN PAGE
app.get("/login",function(req,res){
    // session=req.session;
    // if(session.user){
    //     res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    // }else
    res.sendFile(__dirname + "/admin-page/login.html");
    
});
//GET ADMIN PAGE
app.get("/admin",function(req,res){
    // session=req.session;
    // if(session.user){
    //     res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    // }else
    res.sendFile(__dirname + "/admin-page/index.html");
});
//GET REPORTS PAGE
app.get("/reports",function(req,res){
    res.sendFile(__dirname + "/admin-page/reports.html");
});
//GET PRODUCTS PAGE
app.get("/products",function(req,res){
    res.sendFile(__dirname + "/admin-page/products.html");
});


//GET ADD-PRODUCT PAGE
app.get("/add-product",function(req,res){
    res.sendFile(__dirname + "/admin-page/add-product.html");
});


//adding product data
// var addingProduct = require('/models/adding_product.js')
// const addingProduct = require('./models/adding_Products.js');



app.post("/addingProduct",(req,res)=>{
    // console.log(req.body)
    var data = new addingProduct({
        product_name: req.body.product_name,
        Description: req.body.Description,
        category: req.body.category,
        ExpireDate: req.body.ExpireDate,
        UnitsInCategory: req.body.UnitsInCategory,
      
    })
    obj.save(function(err, results) {
        if(results){
              res.send(results);
              console.log(results);
        }else{
            console.log(err)
            res.send(err);
        }
    })
  
  });




// addingProduct.findOne({Product_name:a},(err,result)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         if(result==null){
//             product.create({
//                 // product_id:b,
//                 Category:c,
//                 Product_name:a,
//                 ExpiryDate:d,
//                 UnitsINStock:e,
//                 // Store_name:c,
//                 // Images:h,
//                 Description:b,
//                 // Price:g,
//                 // Store_id:d,
//                 // Brand_name:i
//             },(err)=>{
//                 if(err){
//                     console.log(err)
//                 }
//                 else{
//                     console.log("product added!!")
//                     res.redirect("/products");
//                 }
//             })
//         }
        
//     }

// })
// });

    // data.save(function(err,result){
    //     if(err){
    //         console.log(err)
    //     }
    //     else{
    //         console.log(result)
    //         console.log(data);
    //         res.redirect('/add-product')
    //     }
    // });

app.get("/addingProduct", function(req,res){
    addingProduct.find({},function(err,docs){
        if(err){
            console.log(err)
        }
        else{
            console.log(docs)
            res.send(docs)
        }
    });
});

// /////

// app.post("/addingProduct",(req,res)=>{
//     console.log(req.body)
//     var a=req.body.product_name
//     var b=req.body.Description
//     var c=req.body.category
//     var d=req.body.ExpireDate
//     var e=req.body.UnitsInCategory
//     // var f=req.body.description
//     // var g=req.body.price
//     // var h=req.body.Images
//     // var i=req.body.brand_name
//     addingProduct.findOne({Product_name:a},(err,result)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             if(result==null){
//                 product.create({
//                     // product_id:b,
//                     Category:c,
//                     Product_name:a,
//                     ExpiryDate:d,
//                     UnitsINStock:e,
//                     // Store_name:c,
//                     // Images:h,
//                     Description:b,
//                     // Price:g,
//                     // Store_id:d,
//                     // Brand_name:i
//                 },(err)=>{
//                     if(err){
//                         console.log(err)
//                     }
//                     else{
//                         console.log("product added!!")
//                         res.redirect("/products");
//                     }
//                 })
//             }
            
//         }

//     })
// });


//deleting Product
app.get("/deleteproduct/:id",(req,res)=>{
    var id=req.params.id;
    console.log(productsdata)
    product.deleteOne(productsdata[id],(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("deleted")
            res.redirect("/add-product")
        }

    })
})

//GET EDIT-PRODUCT PAGE
app.get("/edit-product",function(req,res){
    res.sendFile(__dirname + "/admin-page/edit-product.html");
});
//GET ACCOUNTS PAGE
app.get("/accounts",function(req,res){
    res.sendFile(__dirname + "/admin-page/accounts.html");
});
//GET PROFILE PAGE
app.get("/profile",function(req,res){
    res.sendFile(__dirname + "/admin-page/profile.html");
});

/////////////////////////////////
//////////////////////////////////


///GET SHOP PAGE
app.get("/product",function(req,res){
    res.sendFile(__dirname + "/pages/product.html");
    
});
//GET FEAUTERS PAGE
app.get("/shoping-cart",function(req,res){
    res.sendFile(__dirname + "/pages/shoping-cart.html");
});
//GET BLOG PAGE
app.get("/blog",function(req,res){
    res.sendFile(__dirname + "/pages/blog.html");
});
//GET ABOUT PAGE
app.get("/about",function(req,res){
    res.sendFile(__dirname + "/pages/about.html");
});
//GET CONTACT PAGE
app.get("/contact",function(req,res){
    res.sendFile(__dirname + "/pages/contact.html");
});
// //GET Shirts Page
app.get("/shirts",function(req,res){
    res.sendFile(__dirname + "/pages/shirts.html");
});
//GET Shoes Page
app.get("/shoes",function(req,res){
    res.sendFile(__dirname + "/pages/shoes.html");
});
//GET Coats Page
app.get("/coats",function(req,res){
    res.sendFile(__dirname + "/pages/coats.html");
});
//GET Watch Page
app.get("/watch",function(req,res){
    res.sendFile(__dirname + "/pages/watch.html");
});

//products calling
app.get('/getallproducts',function(req,res){
    // console.log("working")
    collections.find({},function(err,result){
        if(err){
            console.log("err");
        }
        else{
            // console.log(result);
            res.send(result)
        }
        
    });

});
//Coats calling
app.get('/getallcoats',function(req,res){
    // console.log("working")
    collections.find({category_name:"coats"},function(err,result){
        if(err){
            console.log("err");
        }
        else{
            // console.log(result);
            res.send(result)
        }
        
    });

});
//Watches calling
app.get('/getallwatches',function(req,res){
    // console.log("working")
    collections.find({category_name:"watches"},function(err,result){
        if(err){
            console.log("err");
        }
        else{
            // console.log(result);
            res.send(result)
        }
        
    });

});
//Shirts calling
app.get('/getallshirts',function(req,res){
    // console.log("working")
    collections.find({category_name:"shirts"},function(err,result){
        if(err){
            console.log("err");
        }
        else{
            // console.log(result);
            res.send(result)
        }
        
    });

});
//Shoes calling
app.get('/getallshoes',function(req,res){
    // console.log("working")
    collections.find({category_name:"shoes"},function(err,result){
        if(err){
            console.log("err");
        }
        else{
            // console.log(result);
            res.send(result)
        }
        
    });

});
//Login Sessions
app.get("/checkout", function(req,res){
    console.log(req.session)
    if(req.session.visited == false || req.session.visited == undefined)
    {
        res.sendFile(__dirname+'/pages/loginform.html');
    }
    else
    {
        res.sendFile(__dirname+'/pages/loginform.html');
    }    
});


//Home Page calling
app.get('/getallproducts',function(req,res){
    // console.log("working")
    collections.find({},function(err,result){
        if(err){
            console.log("err");
        }
        else{
            // console.log(result);
            res.send(result)
        }
        
    });

});

app.post('/sendData', function(req,res){
    //res.sendFile(__dirname + '/template/signup.html');
    console.log(req.body);
    // res.send(req.body);
    var obj = new signupData({
        name:req.body.name,
        mail:req.body.mail,
        password:req.body.password
    });

    // console.log(obj)
    signupData.findOne({mail: req.body.mail }, function(err,docs){
        if(err || docs==null){
            //console.log(err)
            obj.save(function(err, results) {
                if(results){
                   console.log("results"+ results);
                    res.send(results);
                }else{
                    console.log(err)
                    res.send(err);
                }
            });
        } 
        else{
            res.sendStatus(500);
        }
    });
   
});
app.post('/logindata', function(req,res){
    //res.sendFile(__dirname + '/template/signup.html');
    console.log(req.body);
    
    signupData.findOne({mail : req.body.mail_id,password:req.body.password}, function(err,docs){
        if(err || docs==null){
            //console.log(err)
            res.sendStatus(500)
        } 
        else{
            // req.session.visited = true;
            console.log(docs)
            res.send(docs);
        }
    });
   
});
///// Admin Login page/////
app.post('/adminData', function(req,res){
    //res.sendFile(__dirname + '/template/signup.html');
    // session=req.session;
    console.log(req.body);
    
    adminData.findOne({useremail:req.body.useremail,password:req.body.password}, function(err,docs){
        if(err || docs==null){
            // console.log(err)
            res.sendStatus(500)
        } 
        else{
            // req.session.visited = true;
            // console.log(docs);
            // session.user=docs;
            res.send(docs);
            
        }
    });
   
});


app.get('/getalldata', function(req,res){
    signupData.find({}, function(err,docs){
        if(err){
            console.log(err)
        }
        else{
            console.log(docs)
        }
    });
});

app.get('/getRegisterationData',(req,res)=>{
    RegisterationData.find({},function(err,result){
            if(err || result==null)
            {
                
                console.log(err)
            }
            else if(result!=undefined)
            {
                
                console.log(result)
                res.send(result);
            }
        });
    });


app.post('/getproductid', function(req,res){
    var itemid = req.body.id
    console.log(itemid)
    collections.find({"product_name":itemid}, function(err,docs){
        if(err){
            console.log(err)
        }
        else{
            console.log(docs)
            res.send(docs)
        }
    });
});

app.listen(3000,()=>console.log("Server Started ✔"));


