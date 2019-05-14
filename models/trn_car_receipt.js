const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carReceipt = new Schema({
    ID_car_receipt: {
        type: String
    },
    register: {
        type: String
    },
    generation: {
        type: String
    },
    color: {
        type: String
    },
    datein: {
        type: String
    },
    dateout: {
        type: String
    },
    ID_customer: {
        type: String
    },
    ID_employee: {
        type: String
    },
    status: {
        type: String
    }
},

    {
        collection: 'trn_car_receipt'
    });

module.exports = mongoose.model('carReceipt', carReceipt);