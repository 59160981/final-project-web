const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Custo = new Schema({
  ID_customer: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  birthday: { type: String },
  gender: { type: String },
  address: { type: String },
  telephone: { type: String },
  email: { type: String }
},
  {
    collection: 'mst_customer'
  });

module.exports = mongoose.model('Custo', Custo);