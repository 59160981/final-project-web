const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Emp = new Schema({
    ID_employee: {
        type: String
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    birthday: {
        type: String
    },
    gender: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    telephone: {
        type: String
    },
    email: {
        type: String
    },
    position: {
        type: String
    }
},

    {
        collection: 'mst_employee'
    });

module.exports = mongoose.model('Emp', Emp);