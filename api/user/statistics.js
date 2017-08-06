/* 统计数据接口 */
var express = require('express');
var router = express.Router();
var StatisticModel = require('../../models/statistic');
var lang = require('../../lib/lang.json');

router.route('/statistic')
  .get(function (req, res, next) {
    var ip = req.ip;
    var statisticQuery = StatisticModel.Statistic.findOne({'ip': ip});
    statisticQuery.exec(function (err, doc) {
      if (doc) {
        doc.count++;
        doc.save(function (err) {
          if (err) {
            res.json(200, {
              status: 0,
              message: lang.error
            })
          } else {
            countStatistic();
          }
        });
      } else {
        var newStatistic = new StatisticModel.Statistic({
          ip: ip,
          count: 0
        });
        newStatistic.save(function (err) {
          if (err) {
            res.json(200, {
              status: 0,
              message: lang.error
            })
          } else {
            countStatistic();
          }
        })
      }
    });

    function countStatistic() {
      StatisticModel.Statistic.find({}).exec(function (err, doc) {
        if (err) {
          res.json(200, {
            status: 0,
            message: lang.error
          })
        } else {
          var uv = doc.length;
          var pv = 0;
          doc.forEach(function (data, index) {
            pv += data.count;
          });
          res.json(200, {
            status: 1,
            message: lang.success,
            data: {
              uv: uv,
              pv: pv
            }
          })
        }
      })
    }
  });




module.exports = router;
