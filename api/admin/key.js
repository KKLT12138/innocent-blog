var express = require('express');
var router = express.Router();
var lang = require('../../lib/lang.json');
var hash = require('../../lib/hash');
var checkLogin = require('../checkLogin').checkLogin;
var checkVisitor = require('../checkLogin').checkVisitor;

router.route('/key')
  .get(checkVisitor, function (req, res, next) {
    var name = req.query.name;
    if (name) {
      var salt = hash.setSalt(32);
      var key = hash.communism(name, salt);
      res.json(200, {
        status: 1,
        message: lang.success,
        key: {
          password: key,
          pwd: salt
        }
      })
    } else {
      res.json(200, {
        status: 0,
        key: {
          password: 'joker',
          pwd: 'joker'
        }
      })
    }

  });

module.exports = router;