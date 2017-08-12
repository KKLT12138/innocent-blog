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
 * 获取指定id文章接口
 */
router.route('/post/:id')
  .get(function (req, res, next) {
    var postCollection;
    var postQuery = PostModel.Post.findOne({'_id': req.params.id});
    postQuery.exec(function (err, posts) {
      postCollection = posts;
      var tagQuery = TagModel.Tag.find({'_id': {$in: postCollection.tags}});
      tagQuery.exec(function (err, tags) {
        postCollection.tags = [];
        for (var i in tags) {
          postCollection.tags[i] = {};
          postCollection.tags[i].id =tags[i]._id;
          postCollection.tags[i].name = tags[i].name;
        }
        var categoryQuery = CategoryModel.Category.findOne({'_id': postCollection.category});
        categoryQuery.exec(function (err, category) {
          var postCategory = {};
          postCategory.id = category._id;
          postCategory.name = category.category;
          res.json(200, {
            id: postCollection.id,
            title: postCollection.title,
            author: postCollection.author,
            category: postCategory,
            date: postCollection.date,
            reading: postCollection.reading,
            content: postCollection.content,
            tags: postCollection.tags
          });
        });
      });
    });
  });

/**
 * 统计阅读量
 */
router.route('/post')
  .post(function (req, res, next) {
    var id = req.body.id;
    var postQuery = PostModel.Post.findOne().where('_id', id).exec(function (error, doc) {
      doc.reading++;
      doc.save(function (err) {
        if (err) {
          console.log(err);
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
  });

/**
 * 获得相邻文章
 */
router.route('/postneighbors/:id')
  .get(function (req, res, next) {
    var postId = req.params.id;
    PostModel.Post.findOne({'_id': postId}).exec(function (err, post) {
      var prevPost = {};
      var nextPost = {};
      PostModel.Post.find({'_id': {$gt: postId}}).sort({'_id': 1}).limit(1).exec(function (err, p) {
        if (p.length) {
          prevPost.id = p[0]._id;
          prevPost.title = p[0].title;
        } else {
          prevPost.id = null;
          prevPost.title = null;
        }
        PostModel.Post.find({'_id': {$lt: postId}}).sort({'_id': -1}).limit(1).exec(function (err, n) {
          if (n.length) {
            nextPost.id = n[0]._id;
            nextPost.title = n[0].title;
          } else {
            nextPost.id = null;
            nextPost.title = null;
          }
          res.json(200, {
            status: 1,
            message: lang.success,
            data: {
              prevPost: prevPost,
              nextPost: nextPost
            }
          })
        })
      })
    })
  });

/**
 * 获取分类信息
 */
router.route('/categoryinfo')
  .get(function (req, res, next) {
    var categoryCollection;
    var categoryQuery = CategoryModel.Category.find({});
    categoryQuery.exec(function (err, categories) {
      categoryCollection = categories;
      res.json(200, categoryCollection);
    });
  });

/**
 * 获取每个分类有多少篇文章
 */
router.route('/categorypostnum')
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
  });

/**
 * 获取对应分类的文章（带分页）
 */
router.route('/categoryposts')
  .get(function (req, res, next) {
    var postCollection;
    var categoryId = req.query.id;
    var size = +req.query.size;
    var page = +req.query.page;
    var totalNum;
    PostModel.Post.find({'category': categoryId}).count().exec(function (err, count) {
      totalNum = count;
      var postQuery = PostModel.Post.find({'category': categoryId}).sort({date: -1}).skip((page - 1) * size).limit(size);
      postQuery.exec(function (err, posts) {
        postCollection = posts;
        res.json(200, {
          data: postCollection,
          totalNum: totalNum
        });
      });
    });
  });

/**
 * 获取标签云
 */
router.route('/tagcloud')
  .get(function (req, res, next) {
    var tagCollection;
    var tagQuery = TagModel.Tag.find({});
    tagQuery.exec(function (err, categories) {
      tagCollection = categories;
      res.json(200, tagCollection);
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