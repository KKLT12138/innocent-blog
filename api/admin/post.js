/* 文章接口 */
var express = require('express');
var router = express.Router();
var PostModel = require('../../models/post');
var TagModel = require('../../models/tag');
var lang = require('../../lib/lang.json');

router.route('/post')
  .get(function (req, res, next) {
    var postCollection;
    var size = +req.query.size;
    var page = +req.query.page;
    var totalNum;
    //这种分页处理方式在数据量小时性能更佳，它占用更少的内存
    /*var postQuery = PostModel.Post.find({}).sort({order: -1, date: -1}).skip((page - 1) * size).limit(size);
    postQuery.exec(function (err, posts) {
      postCollection = posts;
      res.json(200, postCollection);
    });*/
    PostModel.Post.find({}).count().exec(function (err, count) {
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
  })
  .delete(function (req, res, next) {
    var postQuery = PostModel.Post.find({'_id': {$in: req.body.id}});
    postQuery.exec(function (err) {
      if (err) {
        res.json(200, {
          status: 0,
          message: lang.error
        })
      } else {
        postQuery.remove(function (err, doc) {
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