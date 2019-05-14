const express = require('express');
const Router = express.Router();
const Emp = require('../models/mst_employee');
var userLogin = "";


Router.route('/').get(function (req, res) {  //render หน้า register
  res.render('register', { err: false });
});

Router.route('/add').post(function (req, res) {  //Add User ของ register
  const DataUser = new Employee(req.body);
  const EMP_ID = req.body.ID_employee;
  Emp.findOne({ ID_employee: EMP_ID }, function (err, userInServer) { //Check ว่ามีรหัสพนักงานในระบบหรือไม่
    if (userInServer) {
        Emp.find(function (err, employee) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('have user in server')
          res.render('addEmployee', { login: userLogin, err: true, employee: employee }); //render collection "users"
        }
      });
    } else {
      console.log(DataUser);
      DataUser.save();
      res.redirect('/login/home');
    }
  });
});


module.exports = Router;