
const express = require('express');
const router = express.Router();
const Listing = require('../models/listings.js');
/**
 *Create Listing
 *@POST {{baseUrl}}/api/v1/listings/add
*/



router.get('/tester', async(req,res)=> {
    res.send(" This was a test");
})

router.post('/new', async(req,res)=> {
    try {
        if (Object.keys(req.body).length == 0)
        return res.status(400).send({ success: false, message: 'Please fill out the fields' });

        const newListing = await Listing.create(req.body);
        return res.status(201).send({
        success: true,
        message:" Estate Agency added succesfully",
        data: newListing
        })

    } catch (error) {
         return res.status(200).send({
                success: false,
                message: 'Estate was not created'
            })
    }
});

/**
 *Fetch Listings
 *@GET {{baseUrl}}/api/v1/listings/all
*/

router.get('/', async(req,res) => {
try {
    const allListings = await Listing.find();
        return res.status(200).send({
            success: true,
            data: allListings,
            message: 'listings data fetched'
        })

} catch (error) {
     return res.status(500).send({
                success: false,
                message: error
            })
}
});

/**
 *Update Listings
 *@PUT {{baseUrl}}/api/v1/admin/genre/update
*/

router.put('/:id', async (req,res)=> {
    try {
         //const {_id} = req.body;
         const oneListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true})
         if (!oneListing) {
             return res.status(404).send({
              success: false,
             message: 'No matching records found for given ID.'
             });
         }
         else {
            return res.status(201).send({
                success: true,
                message:"Successfuly Updated Resource",
                data: oneListing
             })}
}
 catch(error){
     return res.status(500).send({
         success: false,
         message: 'Invalid ID passed',
         Errors: error
     })
 }
});


/**
 *fetchSingle Listing
 *@GET {{baseUrl}}/api/v1/listings/:id'
*/
router.get('/:id', async(req, res) => {
    
    try{
   const listings_id = req.params.id;
    const singleListing  = await Listing.findOne({ _id: listings_id});
    console.log(singleListing, " SINGlE LISTING")
    if(singleListing){
        return res.status(200).send({
            success: true,
            data: singleListing,
            message: 'requested Listing category fetched'
        })
    }
    else {
        return res.status(404).send({
            success: false,
            message: "No matching records found"
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
 *Delete Listings
 *@DELETE {{baseUrl}}/api/v1/listings/:id'
*/

router.delete('/:id', async(req, res) => {
    try{
        const listing_id = req.params.id;
        const deletedListing = await Listing.findByIdAndRemove({_id: listing_id});
        if(!listing_id) {
            return res.status(404).send({
                success: false,
                message: 'No matching records found',
            })
        }
        else {
        return res.status(200).send({
        message:"Successfuly Deleted Resource",
        data: deletedListing
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