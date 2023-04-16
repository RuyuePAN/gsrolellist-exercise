const express = require("express");
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
const router = express();


// 注册
router.post('/reg', (req, res) => {
    // TODO：还应该查询用户名是否已经存在
    var json = {
        username: req.body.username,
        password: md5(req.body.password),
        msg:"注册成功啦",
        url:"/login"
    };
    // 插入账号信息
    UserModel.create({
        username: req.body.username,
        password: md5(req.body.password)
    }).then(() => {
        res.render("success", json);
    }).catch((err) => {
        console.log("注册失败");
    });
});

// 登录操作
router.post('/login', (req, res) => {
    UserModel.findOne({
        username: req.body.username,
        password: md5(req.body.password)
    }).then((user) => {
        // console.log(user);
        if(user) {
            // 写入session
            req.session.username = user.username;
            req.session._id = user._id;
            // 创建当前用户的token
            var json = {
                msg:"登录成功",
                username:req.body.username,
                url: "/rolelist"
            };
            // 登录成功
            res.render('success', json);
        } else {
            // 登录失败
            var json = {
                msg:'用户名或密码错误',
                data:null,
                url:"/login"
            };
            res.render("failure", json);
        }
    }).catch((err) => {
        // 登录失败
        res.json({
            msg:"登录失败",
            data:err,
            url:"/login"
        });
        console.log(err);
    });
});  

module.exports = router;
