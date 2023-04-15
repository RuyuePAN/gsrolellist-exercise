module.exports = (req, res, next) => {
    // 判断是否登录了
    if(!req.session.username) {
        return res.redirect("/login");
    }
    next();
}