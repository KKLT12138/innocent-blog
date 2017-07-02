var express = require('express');
var router = express.Router();
var AuserModel = require('../models/auser');
var lang = require('../lib/lang.json');
var hash = require('../lib/hash');

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
   * date示例：
   * {
   *   username: "admin", //用户名
   *   password: "123456", //密码
   *   verify: "1a2b", //验证码
   * }
   * 状态码：
   * 0  错误
   * 1  成功
   * */
  .post(function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var verify = req.body.verify;

    if (!username.match(/^[\w\d]{2,14}$/)) {
      res.json(200, {
        status: 0,
        message: "非法的用户名"
      })
    } else if (!password.match(/^[\w\d\.\?\!\@\#\$\%\^\&\*]{2,16}$/)) {
      res.json(200, {
        status: 0,
        message: "非法的密码"
      })
    } else if (!verify.match(/^[a-z0-9]{4}$/i)) {
      res.json(200, {
        status: 0,
        message: "非法的验证码"
      })
    } else {
      var ip = req.ip;

      var auserQuery = AuserModel.Auser.find({});
      auserQuery.exec(function (err, ausers) {
        ausers.forEach(function (auser, index) {
          if (username === auser.name) {
            //用户名正确
            password = hash.communism(password, auser.salt);
            if (password === auser.password) {
              //登录成功
              var currentIp = auser.currentIp;
              var currentDate = auser.currentDate;
              var dateNow = Date.now();

              var setAuser = {
                lastIp: currentIp,
                currentIp: ip,
                lastDate: currentDate,
                currentDate: dateNow
              };
              auserQuery.update(setAuser, function (err, doc) {
                console.log(err, doc);
              });

              res.json(200, {
                status: 1,
                message: lang.success
              });
            } else {
              //登录失败，密码错误
              res.json(200, {
                status: 0,
                message: lang.passwordError
              });
            }
          } else {
            //用户名不存在
            res.json(200, {
              status: 0,
              message: lang.usernameError
            });
          }
        })
      });
    }

  })

module.exports = router;