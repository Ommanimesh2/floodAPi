const express=require("express");
const app=express()
const PORT=process.env.PORT || 3000
const mongoose=require('mongoose')
require('dotenv')
mongoose.connect("mongodb+srv://omm:ommanimesh@cluster0.aaovc.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true}).then(()=>{
    console.log("db connected successfully");
})

app.listen(PORT,()=>{
    console.log("server is up and running");
})