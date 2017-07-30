/* 文章接口 */
var express = require('express');
var router = express.Router();
var PostModel = require('../../models/post');
var lang = require('../../lib/lang.json');

router.route('/post')
  .get(function (req, res, next) {
    var postCollection;
    var postQuery = PostModel.Post.find({});
    postQuery.exec(function (err, posts) {
      postCollection = posts;
      res.json(200, postCollection);
    });
  })
  .post(function (req, res, next) {
    var id = req.body.id;
    console.dir(req.body)

  })


module.exports = router;