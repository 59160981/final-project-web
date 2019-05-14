const express = require('express');
const Router = express.Router();
const User = require('../models/mst_employee');
const Order = require('../models/trn_order');
const Custo = require('../models/mst_customer');
const Invoice = require('../models/trn_invoice');
const Emp = require('../models/mst_employee');
userLogin = ""

Router.route('/:id').get(function (req, res) {
    const ID_order = req.params.id
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById(userLogin, function (err, user) {
            // console.log(user)
            userName = user.firstname + " " + user.lastname
            Order.findById(ID_order, function (err, order) {
                res.render('offician-taxInvoice', { login: userName, order: order });
            })
        })
    }
});

Router.route('/:id').post(function (req, res) {
    const ID_order = req.params.id
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById(userLogin, function (err, user) {
            // console.log(user)
            userName = user.firstname + " " + user.lastname
            Order.findById(ID_order, function (err, order) {
                // console.log(order)
                Custo.findOne({ ID_customer: order.ID_customer }, function (err, custo) {
                    // console.log(custo)
                    Emp.findOne({ ID_employee: order.ID_employee }, function (err, emp) {
                        // console.log(emp)
                        Invoice.find(function (err, invoice) {
                            const tax = req.body.tax
                            const data = new Invoice({ ID_invoice: invoice.length+1, tax: tax, ID_order: order.ID_order })
                            // console.log(data)
                            data.save()
                            res.render('offician-taxInvoice-print', { login: userName, order: order, custo: custo, emp: emp ,tax:tax});
                        })
                    })
                })
            })
        })
    }
});

module.exports = Router;
