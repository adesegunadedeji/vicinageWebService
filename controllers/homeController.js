const express = require('express');
const router = express.Router();
const Home = require('../models/homes.js');
const Listing = require('../models/listings.js');
const RealEstate = require('../models/realEstate.js');

/**
 *Fetch All Homes
 *@GET {{baseUrl}}/api/v1/homes
*/
router.get('/all', async (req, res) => {
    res.send('HOme is where the heart is');

//     try  {
//      const allHomes = await Home.find();
//      return res.status(200).send({
//          message: "All Homes Fetched", 
//          data: allHomes
//        });
//    } catch (error){
//      return res.status(500).send({
//          success: false,
//          message: error
//      })
//    }
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
        return res.status(201).send({
            success: true,
            data: new_home,
            message: 'new home created successful'
        })
    } catch (error) {
        return res.status(500).send({
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
                return res.status(404).send({
                 success: false,
                message: 'No matching records found for given ID.'
                });
            }
            else {
                return res.status(201).send({
                success: true,
                message:"Successfuly Updated Resource",
               data: singleHome
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
 *Delete Homes
 *@DELETE {{baseUrl}}/api/v1/homes/:id'
*/
router.delete('/:id', async(req, res) => {

    try{
        const home_id = req.params.id;
        const deletedHome = await Home.findByIdAndRemove({_id: home_id});
        if(!home_id) {
            return res.status(404).send({
                success: false,
                message: 'No matching records found',
            })
        }
    else {
        return res.status(200).send({
        message:"Successfuly Deleted Resource",
        data: deletedHome
})
}
} catch(err){
        return res.status(500).send({
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
        return res.status(404).send({
            success: false,
            message: "No matching records found"
        })
    }
    else {
        res.status(200).send({
            success: true,
            data: singleHome,
            message: 'Single Home fetched'
        })
    }
}
    catch(err){
        res.status(500).send({
            success: false,
            message: " Invalid ID passed",
            error: err
        })
   }
});

module.exports = router;
