const express = require('express');
const Router = express.Router();
const User = require('../models/mst_employee');
userLogin = ""

Router.route('/mainpage').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/login')
    } else {
        User.findById(userLogin , function (err, user) {
            // console.log(user)
            userName = user.firstname + " " + user.lastname
            res.render('offician-mainpage',{login: userName});
        })
    }
});

module.exports = Router;