const express = require("express");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restapi');
const userRoutes = require("./router/user");
const loginRoutes = require("./router/logreg");
const postRoutes = require("./router/createpost");
const SECRET = "RESTAPI";
var jwt = require('jsonwebtoken');
const app = express()


app.use("/api/v2/post", (req, res, next) =>{
    var token = req.headers.authorization.split("test ")[1];
    if(!token){
        return res.status(401).json({
            status: "failed",
            message: "Token is missing"
        })
    }
    // verify the toke
    jwt.verify(token, SECRET, async function(err, decoded) {
        if(err){
            return res.status(401).json({
                status:"failed",
                message: "Invalid token"
            })
        }
        req.user = decoded.data;
        next();
    });
});

app.use("/api/v2/users",userRoutes)
app.use("/api/v2",loginRoutes)
app.use("/api/v2",postRoutes)
app.listen(3000,()=>{console.log("server listnn to port 3000")})
