'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomesSchema = new Schema({
    image: { type: String},
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String},
    zip_code: { type: String, required: true },
    state:{ type: String, required: true },
    listings_type: { type: String},
    listings_id: { type: String, required: true},
    publishedStatus: { type: String, enum : ['unpublished', 'published'], default: 'unpublished', required: true },
    year_built:{ type: String},
    sq_Ft: { type: String},
    beds :{type: String, required: true},
    baths :{type: String, required: true},
    parking : {type: Boolean},
    agency: { type: String},
    agency_id: { type: String},
    price: { type: String},
    home_type: { type: String}
},
{timestamps:true, 
    collection : 'Home'
});

const Home = mongoose.model('Home', HomesSchema);
module.exports = Home;