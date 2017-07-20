/* 管理员接口 */
var express = require('express');
var router = express.Router();
var AuserModel = require('../../models/auser');
var lang = require('../../lib/lang.json');

router.route('/adminuser')
  .get(function (req, res, next) {
    var auserCollection = [];
    var auserQuery = AuserModel.Auser.find({});
    auserQuery.exec(function (err, ausers) {
      ausers.forEach( function (auser, index) {
        auserCollection[index] = {};
        auserCollection[index].id = auser._id;
        auserCollection[index].name = auser.name;
        auserCollection[index].ip = auser.lastIp;
        auserCollection[index].date = auser.lastDate;
        auserCollection[index].createDate = auser.createDate;
      });
      res.json(200, auserCollection);
    });
  })


module.exports = router;