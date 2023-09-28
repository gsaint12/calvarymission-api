const  router = require('express').Router();
const db = require('../../models'); // new require for db object



router.get('/' , (req , res)=>{
   return db.Post.findAll()
   .then((posts)=>res.json(posts))
   .catch((err)=>{
    console.log('There was an error querying', JSON.stringify(err))
        return res.send(err)
   });
})




module.exports  = router



