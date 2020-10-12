const express = require('express');
const router = express.Router();
const Home = require('../models/homes.js');
const Listing = require('../models/listings.js');
const RealEstate = require('../models/realEstate.js');

console.log(Listing);
console.log(RealEstate);

/**
 *Fetch All Homes
 *@GET {{baseUrl}}/api/v1/homes
*/
router.get('/', async (req, res) => {
    try  {

    const allHomes = await Home.find();
     res.json({
         status: 200,
         message: "All Homes Fetched", 
         data: allHomes
       });
   } catch (error){
      res.json({
        status:500,
         success: false,
         message: error
     })
   }
});

/**
 *Add Home
 *@POST {{baseUrl}}/api/v1/homes/new
*/
router.post('/new', async (req, res) => {
    try {
    
        const {image, address,city,listings_id, zip_code,state,country, publishedStatus, year_built,sq_Ft, beds, baths,parking, price, home_type, agency_id} = req.body;
        const listing = await Listing.findById({_id: listings_id});
        const agency = await RealEstate.findById({_id: agency_id});
        const new_home = new Home({
            image: image,
            address : address,
            city : city,
            country: country,
            zip_code : zip_code,
            listings_id: listings_id,
            listings_type: listing.listings_type,
            agency_id : agency_id,
            agency: agency.agency_name,
            state : state,
            publishedStatus : publishedStatus, 
            year_built: year_built,
            sq_Ft: sq_Ft, 
            beds : beds,
            baths : baths,
            parking : parking, 
            price : price, 
            home_type : home_type
        });
        await new_home.save();
        res.json({
            status: 201,
            success: true,
            data: new_home,
            message: 'new home created successful'
        })
    } catch (error) {
        res.json({
            status: 500,
            success: false,
            message: 'Something went wrong',
            error: error
          });
    }
});


/**
 *Update Homes
 *@PUT {{baseUrl}}/api/v1/homes/:id
*/

router.put('/:id', async(req, res) => {
    try{

        const singleHome = await Home.findByIdAndUpdate(req.params.id, req.body, {new: true})
            if (!singleHome) {
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
               data: singleHome
                })}
 }
    catch(err){
        res.json({
            status: 500,
            success: false,
            message: 'Invalid ID passed',
            Errors: error
        })
    }
});


/**
 *Delete Homes
 *@DELETE {{baseUrl}}/api/v1/homes/:id'
*/
router.delete('/:id', async(req, res) => {

    try{
        const home_id = req.params.id;
        const deletedHome = await Home.findByIdAndRemove({_id: home_id});
        if(!home_id) {
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
        data: deletedHome
})
}
} catch(err){
        res.json({
        status: 500,
            success: false,
            message: error
        })
    }
})


/**
 *Fetch Single Hoe
 *@GET {{baseUrl}}/api/v1/homes/:id'
*/
router.get('/:id',async(req, res) => {
    
    try{
    const home_id = req.params.id;
    const singleHome  = await Home.findById({ _id: home_id});
        
    if(!singleHome){
        res.json({
            status: 404,
            success: false,
            message: "No matching records found"
        })
    }
    else {
        res.json({
            status: 200,
            success: true,
            data: singleHome,
            message: 'Single Home fetched'
        })
    }
}
    catch(err){
        res.json({
            status: 500,
            success: false,
            message: " Invalid ID passed",
            error: err
        })
   }
});

module.exports = router;
