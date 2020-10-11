'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingsSchema = new Schema ({
    listings_type: { type: String, required: true},

}, { timestamps: true } );

 const Listing = mongoose.model('Listing', ListingsSchema);
module.exports = Listing;