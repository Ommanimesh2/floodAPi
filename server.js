const express=require("express");
const app=express()
const PORT=process.env.PORT || 3000
const mongoose=require('mongoose')
const Routes=require('./routes/floods')
const Route=require('./routes/flooddata')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true}).then(()=>{
    console.log("db connected successfully");
})
app.use('/api/floods', Routes)
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.listen(PORT,()=>{
    console.log("server is up and running");
})