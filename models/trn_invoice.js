const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Invoice = new Schema({
    ID_invoice: { type: String },
    tax: { type: String },
    ID_order: { type: String }
},
  {
    collection: 'trn_invoice'
  });

module.exports = mongoose.model('Invoice', Invoice);