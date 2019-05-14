const express = require('express');
const Router = express.Router();
const Custo = require('../models/mst_customer');
const User = require('../models/mst_employee');

userLogin = ""

Router.route('/').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById(userLogin, function (err, user) {
            userName = user.firstname + " " + user.lastname
            Custo.find(function (err, custo) {
                console.log(custo)
                res.render('offician-buy', { login: userName, custo: custo });
            })
        })
    }
})

Router.route('/').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById(userLogin, function (err, user) {
            userName = user.firstname + " " + user.lastname
            Custo.find(function (err, custo) {
                console.log(custo)
                res.render('offician-buy', { login: userName, custo: custo });
            })
        })
    }
})
//เลือก partner
Router.route('/01/:id').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById(userLogin, function (err, user) {
            userName = user.firstname + " " + user.lastname
            Custo.find(function (err, custo) {
                console.log(custo)
                res.render('offician-buy', { login: userName, custo: custo });
            })
        })
    }
})
module.exports = Router;