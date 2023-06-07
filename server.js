const express=require("express");
const app=express()
const PORT=process.env.PORT || 7000
const mongoose=require('mongoose')
const Routes=require('./routes/floods')
const Route=require('./routes/flooddata')

const cors=require('cors');
const Weblinkdb = require("./models/weblinkmodel");
const Twitdb = require("./models/twitmodel");
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true}).then(()=>{
    console.log("db connected successfully");
})
app.use(cors())
app.use('/api/floods',cors(), Routes)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.get('/omm',(req,res)=>{
//     res.send("omm")
// })
function filterObjectsByDatetime(objects, startDatetime, endDatetime) {
    // Convert the start and end datetime strings to Date objects
    const startDate = new Date(startDatetime);
    const endDate = new Date(endDatetime);
  
    // Filter the array of objects based on the datetime range
    const filteredObjects = objects.filter((obj) => {
      const objDatetime = new Date(obj.Datetime);
      return objDatetime >= startDate && objDatetime <= endDate;
    });
  
    return filteredObjects;
  }
app.get('/weblinks', async (req, res, next) => {

    try {
        const links = await Weblinkdb.find({
            "CountryName": req.query.CountryName
        })
        res.send(links)

    }
    catch (e) {
        res.status(500).send(e)
    }
});
app.get('/twits', async (req, res, next) => {

    try {
        const twits = await Twitdb.find({})
        res.send(twits)

    }
    catch (e) {
        res.status(500).send(e)
    }
});

app.get('/tweets', (req, res, next) => {
   const startDate=req.query.sDate
   const endDate=req.query.eDate

    try {
      Twitdb.find({}).then(e=>{
      const results=filterObjectsByDatetime(e[0].twitdata,req.query.sDate,req.query.eDate)
      console.log(results)
      res.send(results);
    }).catch(err=>{
      console.log(err);
     })

    }
    catch (e) {
        res.status(500).send(e)
    }
});


app.listen(PORT,()=>{
    console.log("server is up and running"+PORT);
})
