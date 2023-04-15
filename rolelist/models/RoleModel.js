const mongoose = require("mongoose");

// 创建文档的结构对象
// 设置文档的单属性以及属性值的类型
let RoleSchema = new mongoose.Schema({
    rolename: {
        type:String,
        required:true,
    },
    country: {
        type:String,
        required:true,
    },
    element: {
        type:String,
        required:true
    },
    weapon: {
        type:String,
        required:true
    },
    remarks: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        required:true
    },
    rarity:{
        type:Number,
        required:true,
        default:4
    }
});

// 创建模型对象：对文档操作的封装对象
let RoleModel = mongoose.model('roles', RoleSchema);

// 暴露模型对象
module.exports = RoleModel;
