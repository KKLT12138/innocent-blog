var db = require('./db');
var mongoose = db.mongoose;

var friendSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  },
  {
    collection: 'friends'
  });

Friend = mongoose.model('friends', categorySchema, 'friends');

exports.Friend = Friend;
