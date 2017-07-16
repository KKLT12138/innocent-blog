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
  .post(function (req, res, next) {
    var name = req.body.name;
    var categoryQuery = CategoryModel.Category.findOne().where('category', name);
    categoryQuery.exec(function (err, repeat) {
      if (repeat) {
        res.json(200, {
          status: 0,
          message: lang.error + ': 分类已存在'
        })
      } else {
        var newCategory = new CategoryModel.Category({
          category: name
        });
        newCategory.save(function (err) {

        })
        res.json(200, {
          status: 1,
          message: lang.success
        });
      }
    });


  })


module.exports = router;