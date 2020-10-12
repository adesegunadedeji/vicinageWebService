
const express = require('express');
const router = express.Router();
const Listing = require('../models/listings.js');
/**
 *Create Listing
 *@POST {{baseUrl}}/api/v1/listings/add
*/





/**
 *Fetch Listings
 *@GET {{baseUrl}}/api/v1/listings/all
*/

router.get('/', async(req,res) => {
try {
    const allListings = await Listing.find();
    res.json({
            status: 200,
            success: true,
            data: allListings,
            message: 'listings data fetched'
        })

} catch (error) {
        res.json({
            status: 500,
                success: false,
                message: error
            })
}
});

router.post('/new', async(req,res)=> {
    try {
        const newListing = await Listing.create(req.body);
        res.json({
            status: 201,
        success: true,
        message:" Estate Agency added succesfully",
        data: newListing
        })

    } catch (error) {
        res.json({
            status: 500,
                success: false,
                message: 'Estate was not created'
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
            res.json({
                status: 404,
              success: false,
             message: 'No matching records found for given ID.'
             });
         }
         else {
            res.json({
                status: 201,
                success: true,
                message:"Successfuly Updated Resource",
                data: oneListing
             })}
}
 catch(error){
    res.json({
        status: 500,
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
    const singleListing  = await Listing.findById({ _id: listings_id});
    console.log(singleListing, " SINGlE LISTING")
    if(singleListing){
        res.json({
            status: 200,
            success: true,
            data: singleListing,
            message: 'requested Listing category fetched'
        })
    }
    else {
        res.json({
            status: 404,
            success: false,
            message: "No matching records found"
        })
    }
}
    catch(err){
        console.log(err)
        res.json({
         status: 500,
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
            res.json({
                status: 404,
                success: false,
                message: 'No matching records found',
            })
        }
        else {
            res.json({
            status: 200,
        message:"Successfuly Deleted Resource",
        data: deletedListing
})
}
} catch(err){
        res.json({
            status: 500,
            success: false,
            message: error
        })
    }
});

router.get('/tester', async(req,res)=> {
    res.send(" This was a test");
})


module.exports = router;