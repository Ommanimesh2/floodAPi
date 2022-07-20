const express=require('express')
const router=express.Router();
const model=require('../models/model')

router.get('/',(req,res)=>{
    model.find({}).limit(4).then(e=>{
      res.send(e);
    }).catch(err=>{
      console.log(err);
     })
  })

  module.exports=router