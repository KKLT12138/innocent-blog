/* 文章接口 */
var express = require('express');
var router = express.Router();
var PostModel = require('../../models/post');
var TagModel = require('../../models/tag');
var lang = require('../../lib/lang.json');

router.route('/post')
  .get(function (req, res, next) {
    var postCollection;
    var postQuery = PostModel.Post.find({}).sort({order: -1, date: -1});
    postQuery.exec(function (err, posts) {
      postCollection = posts;
      res.json(200, postCollection);
    });
  })
  .post(function (req, res, next) {
    var id = req.body.id;
    var title = req.body.title;
    var author = req.body.author;
    var category = req.body.category;
    var tags = req.body.tag;
    var order = req.body.order;
    var date = req.body.date;
    var content = req.body.content;

    tagsRecognize();

    function tagsRecognize() {
      var tagsArr = [];
      var newTags = [];
      tags.forEach(function(tag, index) {
        if (tag.id) {
          tagsArr.push(tag.id);
        } else {
          newTags.push({
            name: tag.tagName
          });
        }
      });
      if (newTags.length > 0) {
        TagModel.Tag.create(newTags, function(err, docs) {
          if (err) {
            tagsArr = null;
            res.json(200, {
              status: 0,
              message: lang.error
            });
          } else {
            docs.forEach(function(doc, index) {
              tagsArr.push(doc.id);
            });
            tags = tagsArr;
          }
          savePost();
        })
      } else {
        tags = tagsArr;
        savePost();
      }
    }

    function savePost() {
      if (id) {
        var postQuery = PostModel.Post.findOne().where('_id', id);
        postQuery.exec(function (error, doc) {
          doc.title = title;
          doc.author = author;
          doc.category = category;
          doc.tags = tags;
          doc.order = order;
          doc.date = date;
          doc.content = content;

          doc.save(function (err) {
            if (err) {
              console.log(err)
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
        var newPost = new PostModel.Post({
          title: title,
          author: author,
          category: category,
          tags: tags,
          order: order,
          date: date,
          reading: 0,
          content: content
        });
        newPost.save(function (err) {
          if (err) {
            res.json(200, {
              status: 0,
              message: lang.error
            });
          } else {
            res.json(200, {
              status: 1,
              message: lang.success
            });
          }
        })
      }
    }
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