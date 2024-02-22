// 1) import dotenv
// Loads .env file contents into process.env by default
require('dotenv').config()

// 2) import express
const express = require('express')

// 3) import cors
const cors = require('cors')

// import router
const router = require('./Router/router')

// import connection
require('./DB/connection')


// 4) create server 
// Creates an Express application. The express() function is a top-level function exported by the express module.
const pfServer = express()

// 5) use of cors by server 
pfServer.use(cors())

// 6) parsing json 
// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
pfServer.use(express.json())

// server using the router
pfServer.use(router)

// server use upload folder 

// first arg => hoe other application use folder
// second arg -> to export that perticular file 
pfServer.use('/uploads',express.static('./uploads'))

//  7) customize port - by default server run on 3000 
const PORT = 4000 || process.env

// 8) run server 
pfServer.listen(PORT,()=>{
    console.log(`server is running successfully at port number ${PORT}`);
})

// get request
pfServer.get('/',(req,res)=>{
    res.send(`<h1 style="color:red" > project fair running successfully</h1>`)

})

// post request
pfServer.post('/',(req,res)=>{
    res.send(`post request`)

})


// post request
pfServer.put('/',(req,res)=>{
    res.send(`put request`)

})


