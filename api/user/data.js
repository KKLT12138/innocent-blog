/* 博客前台访客数据接口 */
var express = require('express');
var router = express.Router();
var PostModel = require('../../models/post');
var CategoryModel = require('../../models/category');
var TagModel = require('../../models/tag');
var lang = require('../../lib/lang.json');

/**
 * 文章分页列表
 */
router.route('/postlist')
  .get(function (req, res, next) {
    var postCollection;
    var size = +req.query.size;
    var page = +req.query.page;
    var totalNum;
    //这种分页处理方式在数据量小时性能更佳，它占用更少的内存
    PostModel.Post.count().exec(function (err, count) {
      totalNum = count;
      PostModel.Post.find({}).sort({order: -1, date: -1}).skip((page - 1) * size).limit(size).populate([
        {
          path: 'category',
          select: {
            'category': 1,
            '_id': 1
          }
        },
        {
          path: 'tags',
          select: {
            'name': 1,
            '_id': 1
          }
        }
      ]).exec(function (err, posts) {
        postCollection = posts;
        res.json(200, {
          data: postCollection,
          totalNum: totalNum
        });
      });
    });
  });

/**
 * 分类数量
 */
router.route('/categorynum')
  .get(function (req, res, next) {
    var categoryQuery = CategoryModel.Category.find({}).count().exec(function (err, num) {
      if (err) {
        res.json(200, {
          status: 0,
          message: lang.error
        })
      } else {
        res.json(200, {
          status: 1,
          message: lang.success,
          num: num
        })
      }
    })
  });

/**
 * 标签数量
 */
router.route('/tagnum')
  .get(function (req, res, next) {
    var tagQuery = TagModel.Tag.find({}).count().exec(function (err, num) {
      if (err) {
        res.json(200, {
          status: 0,
          message: lang.error
        })
      } else {
        res.json(200, {
          status: 1,
          message: lang.success,
          num: num
        })
      }
    })
  });

/**
 * 分类数量
 */
router.route('/categorynum')
  .get(function (req, res, next) {
    var categoryQuery = CategoryModel.Category.find({}).count().exec(function (err, num) {
      if (err) {
        res.json(200, {
          status: 0,
          message: lang.error
        })
      } else {
        res.json(200, {
          status: 1,
          message: lang.success,
          num: num
        })
      }
    })
  });

/**
 * 文章数量
 */
router.route('/postnum')
  .get(function (req, res, next) {
    var postQuery = PostModel.Post.find({}).count().exec(function (err, num) {
      if (err) {
        res.json(200, {
          status: 0,
          message: lang.error
        })
      } else {
        res.json(200, {
          status: 1,
          message: lang.success,
          num: num
        })
      }
    })
  });



module.exports = router;