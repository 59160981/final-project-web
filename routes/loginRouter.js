const express = require('express');
const Router = express.Router();
const User = require('../models/mst_employee');

Router.route('/').get(function (req, res) {
    res.render('login', { err: false });
});

Router.route("/").post(function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ ID_employee: username, password: password }, function (err, user) {
        if (user) {
            userLogin = user._id
            if(user.position == "ช่าง"){
                res.redirect('/technician/mainpage')
            }else{
                res.redirect('/offician/mainpage')
            }
        } else {
            res.render("login", { err: true });
        }
    });
});

module.exports = Router;