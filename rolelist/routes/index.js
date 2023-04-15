var express = require('express');
var router = express.Router();
const moment = require("moment");
const RoleModel = require("../models/RoleModel");
let checkLoginMiddleware = require("../middlewares/checkLoginMiddlewares");

/* GET home page. */
router.get('/', checkLoginMiddleware, function(req, res, next) {

  // 获取所有的角色信息
  RoleModel.find().then((roles) => {
    res.render("rolelist", {roles: roles, moment: moment});
  });
});

// 跳转到角色列表
router.get("/rolelist", checkLoginMiddleware, function(req, res, next) {
  // 获取所有的角色信息
  RoleModel.find().then((roles) => {
      res.render("rolelist", {roles: roles, moment:moment});
  });
  
});

module.exports = router;
