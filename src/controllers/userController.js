"use strict";
var UserDetail = require("../models/userDetails");
var constant = require("../config/comman");

var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var createAccount = function (req, res) {
  try {
    let condition = {
      email: req.body.email,
      isDeleted: false,
    };
    let object = req.body;
    UserDetail.find(condition).exec(async (err, userData) => {
      if (err) {
        return res.json({
          status: 404,
          error: err,
        });
      } else if (userData.length > 0) {
        return res.json({
          status: 404,
          msg: "Email already exist. Please try using another email.",
        });
      } else {
        var password = await bcrypt.hash(req.body.password, 10);
        object["password"] = password;
        var new_user = new UserDetail(object);
        new_user.save(function (err, result) {
          if (err) {
            return res.json({
              status: 404,
              error: err,
            });
          } else {
            return res.json({
              status: 200,
              msg: "User created successfully",
              data: result,
            });

            // UserDetail.findOneAndUpdate({email : req.body.email},{registrationToken:registrationToken},function(err,responceData) {
            //     if (err) {
            //         return res.json({
            //             status: 404,
            //             msg: constant.message[defaultLang].param_missing,
            //             error: err
            //         });
            //     } else if (!responceData) {
            //         return res.json({
            //             status: 404,
            //             msg: constant.message[defaultLang].param_missing,
            //             error: err
            //         });
            //     } else {

            //         sgMail.send(msg).then(resp => {
            //             return res.json({
            //                 status: 200,
            //                 msg: constant.message[defaultLang].success_register,
            //                 // data: result
            //             });
            //         },
            //         (err) => {
            //             return res.json({
            //                 status: "Failure",
            //                 code: 301,
            //                 msg: constant.message[defaultLang].failure_mail_forget
            //             });
            //         })
            //     }
            // })
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

var loginUser = function (req, res) {
  try {
    let condition = {
      email: req.body.email,
      isDeleted: false,
    };
    let object = req.body;
    UserDetail.find(condition).exec(async (err, userData) => {
      if (err) {
        return res.json({
          status: 404,
          error: err,
        });
      } else if (userData.length === 0) {
        return res.json({
          status: 404,
          msg: "Email does not exist. Please create account first.",
        });
      } else {
        let existPass = userData[0].password;
        var password = await bcrypt.compare(req.body.password, existPass);
        const token = await jwt.sign(
          { _id: userData[0]._id },
          constant.jwt.secret,
          { expiresIn: constant.jwt.expire }
        );
        if (password) {
          return res.json({
            status: 200,
            msg: "Login Successful",
            userData: userData[0],
            token: token,
          });
        } else {
          return res.json({
            status: 404,
            msg: "Incorrect password",
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

var AddAdmin = async function (req, res) {
  try {
    let data = new UserDetail(req.body);
    const response = await data.save();
    res.send(response);
  } catch (e) {
    res.send(e);
  }
};

var Test = async function (req, res) {
  try {
    res.send("token working!!!!!!");
  } catch (e) {
    res.send(e);
  }
};

exports.createAccount = createAccount;
exports.loginUser = loginUser;
exports.AddAdmin = AddAdmin;
exports.Test = Test;
