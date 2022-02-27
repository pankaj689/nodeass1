const express= require("express");
var faker = require('faker');
var bodyParser = require('body-parser')

const app=express()
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))

var user=[]
for (var i=0;i<5;i++){
    user.push ({
        name:faker.name.findName(),
        email:faker.internet.email()
    })
}

app.get("/",(req,res)=>{
    res.render("index.ejs",{user})
})

app.get("/form",(req,res)=>{
    res.render("form.ejs",{user})
})

app.post("/user/add",(req,res)=>{
    // console.log("i am in add user")
    // console.log(req.body)
    user.push({
        name:req.body.name,
        email:req.body.email,    
    })
    res.redirect("/")
})
app.listen (3000, () => {
    console.log(`server listening on port 5000`);
})