const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Repairt = new Schema({
    ID_repairt: { type: String },
    name: { type: String },
    price: { type: Number }
},
  {
    collection: 'mst_repairt'
  });

module.exports = mongoose.model('Repairt', Repairt);