/* 文章接口 */
var express = require('express');
var router = express.Router();
var PostModel = require('../../models/post');
var TagModel = require('../../models/tag');
var lang = require('../../lib/lang.json');

router.route('/postlist')
  .get(function (req, res, next) {
    var postCollection;
    var size = +req.query.size;
    var page = +req.query.page;
    var totalNum;
    //这种分页处理方式在数据量小时性能更佳，它占用更少的内存
    PostModel.Post.count().exec(function (err, count) {
      totalNum = count;
      var postQuery = PostModel.Post.find({}).sort({order: -1, date: -1}).skip((page - 1) * size).limit(size);
      postQuery.exec(function (err, posts) {
        postCollection = posts;
        res.json(200, {
          data: postCollection,
          totalNum: totalNum
        });
      });
    });
  });

router.route('/post/:id')
  .get(function (req, res, next) {
    var postCollection;
    var postQuery = PostModel.Post.findOne({'_id': req.params.id});
    postQuery.exec(function (err, posts) {
      postCollection = posts;
      var tagQuery = TagModel.Tag.find({'_id': {$in: postCollection.tags}});
      tagQuery.exec(function (err, tags) {
        postCollection.tags = [];
        tags.forEach(function (tag, index) {
          postCollection.tags.push(tag.name);
        });
        res.json(200, postCollection);
      });
    });
  });



module.exports = router;