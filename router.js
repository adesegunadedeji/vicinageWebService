import express from 'express';
const router = express.Router();

import {userRegistration, loginRegistration, logOut} from './controllers/userController.js'
import {fetchSingleEstate,updateSingleEstate, deleteSingleEstate, addEstateAgency, fetchAllAgencies} from './controllers/estateController.js';
import {addListing, updateListing, fetchAllListings, deleteSingleListing, fetchSingleListing} from './controllers/listingsController.js';
import {fetchHomes, addHome,updateHomes,deleteHomes,fetchSingleHome} from './controllers/homeController.js';

/* 
User Authentication.
 */
router.post('/users/register',userRegistration );
router.post('/users/login',loginRegistration );
router.get('/users/logout',logOut );


/* 
Real Estate Agencies.
 */
,fetchSingleEstate);
,updateSingleEstate);
,deleteSingleEstate);
, addEstateAgency);
, fetchAllAgencies);


/* 
Listings Category.
 */
router.post('/listing/new', addListing);
router.get('/listing/:id',fetchSingleListing);
router.get('/listing', fetchAllListings);
router.put('/listing/:id',updateListing);
router.delete('/listing/:id', deleteSingleListing);

/* 
Homes.
 */
router.get('/homes', fetchHomes);
router.post('/homes/new', addHome);
router.put('/home/:id', updateHomes);
router.delete('/homes/:id', deleteHomes);
router.get('/home/:id', fetchSingleHome);
//default 200 OK
router.get("health", (req, res) => {
    res.send("OK");
});

export {router as Router};