/* 友链接口 */
var express = require('express');
var router = express.Router();
var FriendModel = require('../../models/friend');
var lang = require('../../lib/lang.json');
var checkLogin = require('../checkLogin').checkLogin;
var checkVisitor = require('../checkLogin').checkVisitor;

router.route('/friend')
  .get(checkVisitor, function (req, res, next) {
    var friendCollection;
    var friendQuery = FriendModel.Friend.find({}).sort({order: -1});
    friendQuery.exec(function (err, friends) {
      friendCollection = friends;
      res.json(200, friendCollection);
    });
  })
  .post(checkLogin, function (req, res, next) {
    var id = req.body.id;
    var name = req.body.name;
    var url = req.body.url;
    var order = '' + req.body.order;

    if (!(name.match(/^[A-z0-9\u4e00-\u9fa5\+\#\.\-]{0,20}$/) && url.match(/^(https|http)?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i) && order.match(/^[0-9]+$/))) {
      res.json(200, {
        status: 0,
        message: lang.illegalInput
      })
    } else if (id) {
        var friendQuery = FriendModel.Friend.findOne().where('_id', id);
        friendQuery.exec(function (error, doc) {
          doc.name = name;
          doc.url = url;
          doc.save(function (err) {
            if (err) {
              res.json(200, {
                status: 0,
                message: lang.error
              })
            } else {
              res.json(200, {
                status: 1,
                message: lang.success
              })
            }
          })
        })
      } else {
        var newFriend = new FriendModel.Friend({
          name: name,
          url: url,
          order: order
        });
        newFriend.save(function (err) {
          if (err) {
            res.json(200, {
              status: 0,
              message: lang.error
            })
          } else {
            res.json(200, {
              status: 1,
              message: lang.success
            })
          }
        })
      }
  })
  .delete(checkLogin, function (req, res, next) {
    var friendQuery = FriendModel.Friend.find({'_id': {$in: req.body.id}});
    friendQuery.exec(function (err) {
      if (err) {
        res.json(200, {
          status: 0,
          message: lang.error
        })
      } else {
        friendQuery.remove(function (err, doc) {
          if (err) {
            res.json(200, {
              status: 0,
              message: lang.error
            })
          } else {
            res.json(200, {
              status: 1,
              message: lang.success,
              doc: doc
            })
          }
        });
      }
    })
  });


module.exports = router;
