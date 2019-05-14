const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    ID_order: { type: String },
    ID_employee: { type: String },
    ID_customer: { type: String },
    ID_car_receipt: { type: String },
    details:[{}],
    totalprice: { type: Number },
    status: { type: String },
    order_type: { type: String }
},
  {
    collection: 'trn_order'
  });

module.exports = mongoose.model('Order', Order);