/* 标签接口 */
var express = require('express');
var router = express.Router();
var TagModel = require('../../models/tag');
var lang = require('../../lib/lang.json');

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
    var id = req.body.id;
    var name = req.body.name;

    if (!name.match(/^[A-z0-9]{0,20}$/)) {
      res.json(200, {
        status: 0,
        message: lang.illegalInput
      })
    } else if (id) {
      var tagQuery = TagModel.Tag.findOne().where('_id', id);
      tagQuery.exec(function (error, doc) {
        doc.name = name;
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
      var tagQuery = TagModel.Tag.findOne({'name': {$regex: '^' + name + '$', $options: '$i'}});
      tagQuery.exec(function (err, repeat) {
        if (repeat) {
          res.json(200, {
            status: 0,
            message: lang.error + ': 分类已存在'
          })
        } else {
          var newTag = new TagModel.Tag({
            name: name
          });
          newTag.save(function (err) {
            if (err) {
              res.json(200, {
                status: 0,
                message: lang.error
              })
            } else {
              res.json(200, {
                status: 1,
                message: lang.success
              });
            }
          })
        }
      });
    }
  })
  .delete(function (req, res, next) {
    var tagQuery = TagModel.Tag.find({'_id': {$in: req.body.id}});
    tagQuery.exec(function (err) {
      if (err) {
        res.json(200, {
          status: 0,
          message: lang.error
        })
      } else {
        tagQuery.remove(function (err, doc) {
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
  })


module.exports = router;