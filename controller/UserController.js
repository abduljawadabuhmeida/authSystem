const mongoose = require('mongoose');
const UserModel = require('../model/UserModel');

exports.login = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    // 1 -     التحقق من المدخلات اذا فارغ يقفف ويرسل تآكد من ادخال كل البيانات
    if (!username || !password) {
        return res.json({
            msg: "Please fill all fields",
            state: 0,
            data: [],
        })
    }
    // 2- يتم البحث عن اسم المستخدم اذا موجود يستمر اذا غير موجود يرسل تاكد من اسم المستخدم
    const user = await UserModel.findOne({
        username: username
    })

    if (!user) {
        return res.json({
            msg: "User Not Exists",
            state: 0,
            data: [],
        })
    }
    // 3 - بعد ماتوفر اسم المستخدم يتم مقارنته بكلمة المرور اذا صحيحة يتم الدخول اذا غير صحيحة يرجع برسالة كلمة المرور غير صحيحة
    if (password === user.password) {
        return res.json({
            msg: "Login Success",
            state: 1,
            data: user,
        })
    } else {
        return res.json({
            msg: "Wrong Password",
            state: 0,
            data: [],
        })
    }



}


exports.signup = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const phone = req.body.phone

    // 1 -     التحقق من المدخلات اذا فارغ يقفف ويرسل تآكد من ادخال كل البيانات
    if (!username || !password || !email || !phone) {
        return res.json({
            msg: "Please fill all fields",
            state: 0,
            data: [],
        })
    }


    // 2- يتم البحث عن اسم المستخدم والبريد الٌلكتروني اذا مسجلين مسبقا يقف ويرسل اسم المستخدم او البريد الالكتروني مستخدم مسبقاً
    const user = await UserModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })
    if (user) {
        return res.json({
            msg: "User Or Email Already Exists",
            state: 0,
            data: [],
        })
    }


    // 3- بعد التحقق من البيانات والمدخلات اذا كانت سليمة يتم الاستمرار والتسجيل 
    UserModel.create({
        username: username,
        password: password,
        email: email,
        phone: phone,
    }).then((user) => {
        return res.json({
            msg: "Done Creating User",
            state: 1,
            data: user,
        })
    }).catch((err) => {
        console.log(err)
        res.json({
            msg: "Error Creating User",
            state: 0,
            data: [],
        })
    });

}

