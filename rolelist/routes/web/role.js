const express = require("express");
const router = express();

let checkLoginMiddleware = require("../../middlewares/checkLoginMiddlewares");

// 跳转到【添加角色】页面
router.get("/roleadd", checkLoginMiddleware, (req, res) => {
    res.render("roleadd");
});

module.exports = router;