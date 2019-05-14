const express = require('express');
const Router = express.Router();
const User = require('../models/mst_employee');
const Custo = require('../models/mst_customer');
const carReceipt = require('../models/trn_car_receipt');
const Order = require('../models/trn_order');
userLogin = ""

//จัดการซ่อม
Router.route('/').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById(userLogin , function (err, user) {
            // console.log(user)
            Custo.find(function (err, custo) {
                // console.log(custo)
                userName = user.firstname + " " + user.lastname
                res.render('offician-repair', { login: userName, custo: custo });
            })
        })
    }
});
//เปิดหน้าใบรับรถ
Router.route('/receiveCar/:id').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById(userLogin , function (err, user) {
            Custo.findById(req.params.id, function (err, custo) {
                userName = user.firstname + " " + user.lastname
                res.render('offician-repair-receiveCar', { login: userName, custo: custo });
            })
        })
    }
});
//สร้างใบรับรถ
Router.route('/receiveCar/:id').post(function (req, res) {
    const ID_car_receipt = req.params.id
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById(userLogin , function (err, user) {
            userName = user.firstname + " " + user.lastname
            Custo.findById(ID_car_receipt, function (err, custo) {
                carReceipt.find(function (err, carreceipt) {
                    const id = carreceipt.length + 1;
                    var data_car_receipt = new carReceipt({
                        ID_car_receipt: id,
                        register: req.body.register,
                        generation: req.body.generation,
                        color: req.body.color,
                        datein: req.body.datein,
                        dateout: req.body.dateout,
                        ID_customer: custo.ID_customer,
                        ID_employee: user.ID_employee,
                        status: "ยังไม่ซ่อม"
                    })
                    console.log(data_car_receipt)
                    data_car_receipt.save()
                    Order.find(function(err,order){
                        const ID_order = order.length+1
                        const data_order = new Order({
                            ID_order: ID_order,
                            ID_employee: user.ID_employee,
                            ID_customer: custo.ID_customer,
                            ID_car_receipt: id,
                            detail: [],
                            totalprice: 0,
                            status: "ยังไม่จ่าย",
                            order_type: "การซ่อม"
                        })
                        console.log(data_order)
                        data_order.save()
                    })
                    res.render('offician-repair-receiveCar-print',{login:userName,data:data_car_receipt})
                })
            })
        })
    }
});
module.exports = Router;
