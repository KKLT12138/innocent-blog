var express = require('express');
var router = express.Router();
var AuserModel = require('../models/auser');
var lang = require('../lib/lang.json');

router.route('/login')
    /*
    * 后台管理登录页
    * /admin/login
    * */
    .get(function (req, res, next) {
        res.render('admin/login');
    })
    /*
    * 登录接口
    * demo：
    *
    * */
    .post(function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        var verify = req.body.verify;

        var auserQuery = AuserModel.Auser.find({});
        auserQuery.exec(function (err, ausers) {
            ausers.forEach(function (auser, index) {
                console.log(auser.name)
                if (username === auser.name) {
                    if (password === auser.password) {
                        res.json(200, {
                            status: 1,
                            message: lang.success
                        });
                    } else {
                        res.json(200, {
                            status: 0,
                            message: lang.passwordError
                        });
                    }
                } else {
                    res.json(200, {
                        status: 1,
                        message: lang.usernameError
                    });
                }
            })
        });

    })

module.exports = router;