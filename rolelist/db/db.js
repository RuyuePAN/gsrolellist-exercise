module.exports = function(success, error) {
    // 判断error为其设置默认值
    if (typeof(error) !== 'function') {
        error = () => {
            console.log("连接失败");
        }
    }


    // 导入mongoose
    const mongoose = require("mongoose");
    // 导入配置文件
    const {DBNAME, DBPORT, DBHOST} = require("../config/config");
    // 连接mongoose服务
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);
    // 设置连接成功的回调
    mongoose.connection.once('open', () => {
        success();
    });
    // 设置连接错误的回调
    mongoose.connection.on('error', () => {
        error();
    });
    // 设置连接关闭的回调
    mongoose.connection.once('close', () => {
        console.log('连接关闭');
    });
}