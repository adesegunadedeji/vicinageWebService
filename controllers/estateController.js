const express = require('express');
const router = express.Router();
const  RealEstate = require('../models/realEstate.js');

/**
 *Fetch All Estate Agencies
 *@GET {{baseUrl}}/api/v1/estates
*/
router.get('/',async (req, res, next) => {
       try  {

        const allAgencies = await RealEstate.find();
        res.json({
            code: 200,
            message: "All agencies Fetched", 
            data: allAgencies
          });
      } catch (error){
        return res.status(500).send({
            success: false,
            message: error
        })
      }
  });
/**
 *Add Estate Agency
 *@POST {{baseUrl}}/api/v1/estate/new
*/
router.post('/new',async(req,res)=>{
    // req.body.user = req.session.userId //To know who's Logged In
    try{
        if (Object.keys(req.body).length == 0)
        return res.status(400).send({ success: false, message: 'Please fill all fields' });
        const newRealEstate = await RealEstate.create(req.body); 
            return res.status(201).send({
                success: true,
                data: newRealEstate,
                message: 'Real Estate created successful'
            })
}
    catch(err){
           return res.status(200).send({
                success: false,
                message: 'Estate was not created'
            })
    }
});


/**
 *Fetch Single EstateAgency
 *@GET {{baseUrl}}/api/v1/estates/:id'
*/
router.get('/:id',  async(req, res) => {
    
    try{
    const estate_id = req.params.id;
    const singleEstateAgent  = await RealEstate.findOne({ _id: estate_id});
        
    if(!singleEstateAgent){
        return res.send({
            success: false,
            message: "No matching records found"
        })
    }
    else {
        res.status(200).send({
            success: true,
            data: singleEstateAgent,
            message: 'Single Estate Agency fetched'
        })
    }
}
    catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: " Invalid ID passed",
            error: err
        })
   }
});


/**
 *Update Genres
 *@PUT {{baseUrl}}/api/v1/estates/:id
*/

router.put('/:id', async(req, res) => {
    try{
        //const {_id} = req.body;
        const singleAgency = await RealEstate.findByIdAndUpdate(req.params.id, req.body, {new: true})
            if (!singleAgency) {
                return res.status(404).send({
                 success: false,
                message: 'No matching records found for given ID.'
                });
            }
            else {
                res.json({
                    status:{
                        code:201,
                        message:"Successfuly Updated Resource"
                    },
                        data: singleAgency
                })}
 }
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Invalid ID passed',
            Errors: error
        })
    }
});

/**
 *Delete Estate Agency
 *@DELETE {{baseUrl}}/api/v1/estates/:id'
*/
router.delete('/:id', async(req, res) => {

    try{
        const estate_id = req.params.id;
        const deletedRealEstate = await RealEstate.findByIdAndRemove({_id: estate_id});
        if(!estate_id) {
            return res.status(404).send({
                success: false,
                message: 'No matching records found',
            })
        }
else {
    res.json({
    status:{
        code:200,
        message:"Successfuly Deleted Resource"
            },
    data: deletedRealEstate
})
}
} catch(err){
        return res.status(500).send({
            success: false,
            message: error
        })
    }
});

module.exports = router;