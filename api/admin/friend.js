/* 分类接口 */
var express = require('express');
var router = express.Router();
var CategoryModel = require('../../models/category');
var PostModel = require('../../models/post');
var lang = require('../../lib/lang.json');

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
    var id = req.body.id;
    var name = req.body.name;

    if (!name.match(/^[A-z0-9\u4e00-\u9fa5\+\#\.\-]{0,20}$/)) {
      res.json(200, {
        status: 0,
        message: lang.illegalInput
      })
    } else if (id) {
        var categoryQuery = CategoryModel.Category.findOne().where('_id', id);
        categoryQuery.exec(function (error, doc) {
          doc.category = name;
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
        var categoryQuery = CategoryModel.Category.findOne({'category': {$regex: '^' + name + '$', $options: '$i'}});
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
        });
      }
  })
  .delete(function (req, res, next) {
    var categoryQuery = CategoryModel.Category.find({'_id': {$in: req.body.id}});
    categoryQuery.exec(function (err) {
      if (err) {
        res.json(200, {
          status: 0,
          message: lang.error
        })
      } else {
        categoryQuery.remove(function (err, doc) {
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

router.route('/categorynum')
  .get(function (req, res, next) {
    PostModel.Post.aggregate({
      $group: {
        _id: "$category",
        count: {
          $sum: 1
        }
      }
    }).exec(function (err, doc) {
      if (err) {
        res.json(200, {
          status: 0,
          message: lang.error
        })
      } else {
        res.json(200, {
          status: 1,
          message: lang.success,
          data: doc
        })
      }
    })
  })


module.exports = router;