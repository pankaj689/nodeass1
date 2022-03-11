const fs = require("fs")
const http = require("http")
const server = http.createServer((req,res)=>{
    // fs.readFile("E:\10x\main boot camp\Node\nodeass\nodeass1\assignments\assignment_2",{encoding:"utf-8"},(err,data)=>{
    //     console.log(err,data)
    // })

    // fs.writeFile("E:\10x\main boot camp\Node\nodeass\nodeass1\assignments\assignment_2\index.html","<h1>Hello World</h1>",(err)=>{
    //     console.log(err)
    // })
    fs.writeFile("index.html","<h1>Hello World</h1>",(err)=>{
        console.log(err)
    })

    // fs.existsSync("index.html",exist=>{
    //     console.log(exist ? "found":"not found")
    // })
    // fs.exists("index.html",exist=>{
    //     console.log(exist ? "found":"Not found")
    // })


    fs.readFile("index.html",{encoding:"utf-8"},(err,data)=>{
        res.end(data)
    })
})

server.listen(3000,()=>{
 console.log("server is lisning")
})
// server.listen(3000)