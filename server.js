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

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.listen(PORT,()=>{
    console.log("server is up and running");
})