var db = require('./db');
var mongoose = db.mongoose;

var statisticSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  {
    collection: 'statistic'
  });

Statistic = mongoose.model('statistics', statisticSchema, 'statistics');

exports.Statistic = Statistic;
