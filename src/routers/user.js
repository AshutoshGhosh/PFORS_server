var express = require("express");
var app = express();
var router = express.Router();

var userCtrl = require("../controllers/userController");
var auth = require("../auth/auth");

router.use("/login", userCtrl.loginUser);//done
router.use("/createAccount", userCtrl.createAccount);//done
router.use("/addAdmin",  userCtrl.AddAdmin);//done  auth.isAuth,
router.use("/tokenTest",auth.isAuth,  userCtrl.Test);//done



module.exports = router;

