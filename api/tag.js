/* 分类接口 */
var express = require('express');
var router = express.Router();
var TagModel = require('../models/tag');
var lang = require('../lib/lang.json');

router.route('/tag')
  .get(function (req, res, next) {
    var tagCollection;
    var tagQuery = TagModel.Tag.find({});
    tagQuery.exec(function (err, categories) {
      tagCollection = categories;
      res.json(200, tagCollection);
    });
  })
  .post(function (req, res, next) {
    
  })


module.exports = router;