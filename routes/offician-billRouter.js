const express = require('express');
const Router = express.Router();
const User = require('../models/mst_employee');
const Order = require('../models/trn_order');
const Custo = require('../models/mst_customer');
const Emp = require('../models/mst_employee');

userLogin = ""

//ใบเสร็จ
Router.route('/').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById(userLogin, function (err, user) {
            // console.log(user)
            userName = user.firstname + " " + user.lastname
            Order.find(function (err, order) {
                res.render('offician-bill', { login: userName, order: order });
            })
        })
    }
});

Router.route('/:id').get(function (req, res) {
    const ID_order = req.params.id
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById(userLogin, function (err, user) {
            // console.log(user)
            userName = user.firstname + " " + user.lastname
            Order.findById(ID_order, function (err, order) {
                // console.log(order)
                Custo.findOne({ID_customer:order.ID_customer}, function (err, custo) {
                    // console.log(custo)
                    Emp.findOne({ID_employee:order.ID_employee}, function (err, emp) {
                        // console.log(emp)
                        res.render('offician-bill-print', { login: userName, order: order,custo:custo,emp:emp });
                    })
                })
            })
        })
    }
});

Router.route('/:id/pay').get(function (req, res) {
    const ID_order = req.params.id
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById(userLogin, function (err, user) {
            // console.log(user)
            userName = user.firstname + " " + user.lastname
            Order.findById(ID_order, function (err, order) {
                
                order.status="ชำระเงินแล้ว"
                // console.log(order)
                order.save()
                Custo.findOne({ID_customer:order.ID_customer}, function (err, custo) {
                    // console.log(custo)
                    Emp.findOne({ID_employee:order.ID_employee}, function (err, emp) {
                        // console.log(emp)
                        res.redirect('./')
                    })
                })
            })
        })
    }
});
module.exports = Router;
