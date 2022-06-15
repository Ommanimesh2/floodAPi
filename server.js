const express=require("express");
const app=express()
const PORT=process.env.PORT || 3000
const mongoose=require('mongoose')
const Routes=require('./routes/floods')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true}).then(()=>{
    console.log("db connected successfully");
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', Routes)
app.listen(PORT,()=>{
    console.log("server is up and running");
})