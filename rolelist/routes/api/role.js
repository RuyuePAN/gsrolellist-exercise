const mongoose = require("mongoose");
const express = require("express");
const RoleModel = require("../../models/RoleModel");
const router = express.Router();
const moment = require("moment");
let checkLoginMiddleware = require("../../middlewares/checkLoginMiddlewares");



// 添加新角色项目
router.post("/rolelist", checkLoginMiddleware, (req, res) => {
    // console.log(req.body);
    let {rolename, country, element, weapon, remarks, date, rarity} = req.body;
    switch(element){
        case '草元素': element ='Dendro';
        break;
        case '火元素': element ='Pyro';
        break;
        case '风元素': element ='Anemo';
        break;
        case '雷元素': element ='Electro';
        break;
        case '水元素': element ='Hydro';
        break;
        case '岩元素': element ='Geo';
        break;
        case '冰元素': element ='Cryo';
        break;        
    }
    RoleModel.create({
        rolename: rolename,
        country: country,
        element: element,
        weapon: weapon,
        remarks: remarks,
        date: moment(date).toDate(),
        rarity:rarity
    }).then((role) => {
        // TODO：万一插入的角色是已经有的呢？
        // 再次查询获取所有的角色信息
        RoleModel.find().then((roles) => {
            res.render("rolelist", {roles: roles, moment:moment});
        });
    }).catch((err) => {
        console.log("新角色插入失败" + err);
    });
});

// 删除角色
// 这里怎么让超链接a标签传递的是delete请求呢？？？？？？
router.get("/rolelist/:id", checkLoginMiddleware, (req, res) => {
    let {id} = req.params;
    RoleModel.deleteOne({
        _id:id
    }).then((role) => {
        // 再次查询获取所有的角色信息
        RoleModel.find().then((roles) => {
            res.render("rolelist", {roles: roles, moment:moment});
        });
    }).catch((err) => {
        console.log("删除失败" + err);
    });
});


module.exports = router  