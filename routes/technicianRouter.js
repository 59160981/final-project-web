const express = require('express');
const Router = express.Router();
const User = require('../models/mst_employee');
const carReceipt = require('../models/trn_car_receipt');
const Repairt = require('../models/mst_repairt');
const Order = require('../models/trn_order');
userLogin = ""

Router.route('/mainpage').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById({ _id: userLogin }, function (err, user) {
            // console.log(user)
            userName = user.firstname + " " + user.lastname
            carReceipt.find({ status: "ยังไม่ซ่อม" }, function (err, carreceipt) {
                // console.log(carreceipt)
                res.render('tachnician-mainpage', { login: userName, carreceipt: carreceipt });
            })
        })
    }
});
//รายการซ่อม
Router.route('/repair/:id').get(function (req, res) {
    const ID_car_receipt = req.params.id
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById(userLogin, function (err, user) {
            // console.log(user)
            userName = user.firstname + " " + user.lastname
            carReceipt.findById(ID_car_receipt, function (err, carreceipt) {
                // console.log(carreceipt)
                Repairt.find(function (err, repairt) {
                    // console.log(repairt)
                    Order.findOne({ ID_car_receipt: carreceipt.ID_car_receipt }, function (err, order) {
                        console.log(order)
                        res.render('tachnician-repair', { login: userName, carreceipt: carreceipt, repairt: repairt, order: order });
                    })
                })
            })
        })
    }
});
//เพิ่มรายการซ่อม
Router.route('/repair/:id').post(function (req, res) {
    const ID_car_receipt = req.params.id
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        const addOrderDetails = req.body
        console.log(addOrderDetails)
        User.findById(userLogin, function (err, user) {
            // console.log(user)
            userName = user.firstname + " " + user.lastname
            carReceipt.findById(ID_car_receipt, function (err, carreceipt) {
                // console.log(carreceipt)
                Repairt.find(function (err, repairt) {
                    // console.log(repairt)
                    Order.findOne({ ID_car_receipt: carreceipt.ID_car_receipt }, function (err, order) {
                        var sum = 0
                        var totalAmount = 0;
                        for (var i = 0; i < order.details.length; i++) {
                            if (addOrderDetails.name == order.details[i].name) {
                                sum++
                            }
                        }
                        // console.log(dub)
                        if (sum > 0) {
                            for (var i = 0; i < order.details.length; i++) {
                                if (addOrderDetails.name == order.details[i].name) {
                                    totalAmount = order.details[i].amount + parseInt(addOrderDetails.amount)
                                    order.details.push({ name: order.details[i].name, price: order.details[i].price, amount: totalAmount })
                                    order.totalprice += order.details[i].price * parseInt(addOrderDetails.amount)
                                    order.details.splice(i, 1)
                                    order.save()
                                    break;
                                }
                            }
                        } else {
                            Repairt.findOne({ name: addOrderDetails.name }, function (err, repairtFind) {
                                order.details.push({ name: repairtFind.name, price: repairtFind.price, amount: parseInt(addOrderDetails.amount) })
                                order.totalprice += repairtFind.price * parseInt(addOrderDetails.amount)
                                order.save()
                                // console.log(order)
                            })
                        }
                        res.render('tachnician-repair', { login: userName, carreceipt: carreceipt, repairt: repairt, order: order });
                    })
                })
            })
        })
    }
});
Router.route('/repair/delete/:id/:name').get(function (req, res) {
    const ID_car_receipt = req.params.id
    const orderName = req.params.name
    // console.log(orderName)
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById(userLogin, function (err, user) {
            // console.log(user)
            userName = user.firstname + " " + user.lastname
            carReceipt.findById(ID_car_receipt, function (err, carreceipt) {
                // console.log(carreceipt)
                Repairt.find(function (err, repairt) {
                    // console.log(repairt)
                    Order.findOne({ ID_car_receipt: carreceipt.ID_car_receipt }, function (err, order) {
                        // console.log(order)
                        for (var i = 0; i < order.details.length; i++) {
                            if (orderName == order.details[i].name) {
                                order.totalprice -= order.details[i].price * order.details[i].amount
                                order.details.splice(i, 1)
                                order.save()
                                break;
                            }
                        }
                        res.render('tachnician-repair', { login: userName, carreceipt: carreceipt, repairt: repairt, order: order });
                    })
                })
            })
        })
    }
})
//บันทึก
Router.route('/repair/:id/save').get(function (req, res) {
    const ID_car_receipt = req.params.id
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        carReceipt.findById(ID_car_receipt, function (err, carreceipt) {
            carreceipt.status="ยืนยันการซ่อม"
            carreceipt.save()
            res.redirect('/technician/mainpage')
        })
    }
});
module.exports = Router;