var jwt = require('jwt-simple');
var config = require('../config/config.js');

module.exports = {
  checkLogin: function (req, res, next) {
    var token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if (token != 'undefined' && token != 'null' && token !='' && token != undefined) {
      var username = jwt.decode(token, config.jwtSecret).username;
      if (config.adminGroup.indexOf(username) > -1) {
        next();
      } else {
        return res.json(302, {
          status: 3,
          message: '权限不足,请先登录！'
        })
      }
    } else {
      return res.json(302, {
        status: 3,
        message: '权限不足,请先登录！'
      })
    }
  },
  checkVisitor: function (req, res, next) {
    var token = req.headers['x-access-token'] || req.body.token || req.query.token;
    console.log(token)
    if (token != 'undefined' && token != 'null' && token !='' && token != undefined) {
      var username = jwt.decode(token, config.jwtSecret).username;
      if (config.visitorGroup.indexOf(username) > -1) {
        next();
      } else {
        return res.json(302, {
          status: 3,
          message: '权限不足,请先登录！'
        })
      }
    } else {
      return res.json(302, {
        status: 3,
        message: '权限不足,请先登录！'
      })
    }
  }
};