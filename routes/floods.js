const express=require('express')
const router=express.Router();
const model=require('../models/model')


 router.get('/',(req,res)=>{
   model.find({}, {flooddata:0}).then(e=>{
     res.send(e);
   }).catch(err=>{
     console.log(err);
    })
 })
 router.get('/flooddata',(req,res)=>{
     model.find({}).limit(4).then(e=>{
      res.send(e);
    }).catch(err=>{
        console.log(err);
    })
})
router.get('/test',(req,res)=>{
     var dateStr = new Date(year,month,day,2020,12,22)
    model.find({"StartDate" : { $gte : new Date("2020-09-12")}}).limit(4).then(e=>{
      res.send(e);
    }).catch(err=>{
      console.log(err);
     })
  })
router.get('/testing',(req,res)=>{
    model.find({
        "StartDate" : {
            $gte:  req.query.sDate,
        },
        "EndDate" : {
            $lte:  req.query.eDate,
        },
        "CountryName": req.query.CountryName
        

    }).limit(1).then(e=>{
        console.log(e);
      res.send(e);
    }).catch(err=>{
      console.log(err);
     })
  })
//  router.post('/test',(req,res)=>{
//     console.log(req.body.StartDate);
//     model.aggregate([
//         {
//           $project: 
//             {
//               date2:{
//                 $dateFromString: {
//                     dateString: '$date',
//                     onError: null
//                 }
//               }
//             }
//         },
//         {
//           $match: {
//             date2:   {
//               $gte: ISODate(req.body.StartDate),
//               $lte: ISODate(req.body.EndDate)
//             }
//           }
//         }
//       ]).then((e)=>{
//         res.send(e);
//       }).catch((err)=>[
//         res.send(err)
//       ])
//   })
router.get('/api/flood', (req, res,next) => {

    if (req.query.id) {
        const id = req.query.id;

      model.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send(error)
                    console.log(error);
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Erro retrieving flood with id " + id })
            })

 

    } else {
       model.find()
            .then(flood => {
                res.send(flood)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving flood information" })
            })
      
    }
});
// route.put('/api/flood/:id', controller.update);
router.delete('/api/flood/:id', (req, res ) => {
    const id = req.params.id;

   model.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Flood was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Flood with id=" + id
            });
        });
       
     
});
//Link
 
router.get('/api/link',(req, res ) => {

    if (req.query.id) {
        const id = req.query.id;

        
       weblinkmodel.findById(id)
            .then(link => {
                if (!link) {
                    res.status(404).send(errorr)
                    console.log(errorr);
                } else {
                    res.send(link)
                }
            })
            .catch(errr => {
                res.status(500).send({ message: "Erro retrieving weblink with id " + id })
            })

    } else {
     weblinkmodel.find()
            .then(links=> {
                res.send(links)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving link information" })
            })
     
    }


});


router.delete('/api/link/:id', (req, res ) => {
    const id = req.params.id;

 
    weblinkmodel.findByIdAndDelete(id)
        .then(link => {
            if (!link) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Link was deleted successfully!"
                })
            }
        })
        .catch(errr => {
            res.status(500).send({
                message: "Could not delete Link with id=" + id
            });
        });
     
});
//tweet 
router.get('/api/twit',(req, res ) => {

    if (req.query.id) {
        const id = req.query.id;

        
      twitmodel.findById(id)
            .then(twit => {
                if (!twit) {
                    res.status(404).send(errorr)
                    console.log(errorr);
                } else {
                    res.send(twit)
                }
            })
            .catch(errr => {
                res.status(500).send({ message: "Erro retrieving weblink with id " + id })
            })

    } else {
    twitmodel.find()
            .then(twits=> {
                res.send(twits)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving link information" })
            })
     
    }


});

router.delete('/api/twit/:id', (req, res ) => {
    const id = req.params.id;

 
    twitmodel.findByIdAndDelete(id)
        .then(twit => {
            if (!twit) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Twit was deleted successfully!"
                })
            }
        })
        .catch(errr => {
            res.status(500).send({
                message: "Could not delete Twit with id=" + id
            });
        });
     
});
module.exports=router