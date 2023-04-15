const express = require("express");
const router = express();
let checkLoginMiddleware = require("../../middlewares/checkLoginMiddlewares");

// 转到注册页面
router.get('/reg', (req, res) => {
    res.render("auth/reg");
});

// 跳转到登录页面
router.get('/login', (req, res) => {
    res.render("auth/login");
});  

// 退出登录
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.render("success", {
            username:"",
            msg:"已经全身而退啦",
            url:"/login"
        });
    });
});

module.exports = router;
