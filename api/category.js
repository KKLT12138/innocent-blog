/* 分类接口 */
var express = require('express');
var router = express.Router();
var CategoryModel = require('../models/category');
var lang = require('../lib/lang.json');

router.route('/category')
  .get(function (req, res, next) {
    var categoryCollection;
    var categoryQuery = CategoryModel.Category.find({});
    categoryQuery.exec(function (err, categories) {
      categoryCollection = categories;
      res.json(200, categoryCollection);
    });
  })


module.exports = router;