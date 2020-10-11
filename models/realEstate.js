'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const realEstateCompanySchema = new Schema({
    agency_name: { type: String, required: true },
    image: { type: String},
    address: { type: String, required: true },
    city: { type: String, required: true },
    state:{ type: String, required: true },
    country:{ type: String, required: true },
    email: { type: String},
    contactNumber: { type: String, required: true },
},  
{timestamps:true, 
    collection : 'realEstate'
})

 const RealEstate = mongoose.model('RealEstate', realEstateCompanySchema);
module.exports = RealEstate;