/* 友链接口 */
var express = require('express');
var router = express.Router();
var FriendModel = require('../../models/friend');
var lang = require('../../lib/lang.json');

router.route('/friend')
  .get(function (req, res, next) {
    var friendCollection;
    var friendQuery = FriendModel.Friend.find({}).sort({order: -1});
    friendQuery.exec(function (err, friends) {
      friendCollection = friends;
      res.json(200, friendCollection);
    });
  });


module.exports = router;
