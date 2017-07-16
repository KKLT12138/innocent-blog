var db = require('./db');
var mongoose = db.mongoose;

var tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    collection: 'tags'
  });

Tag = mongoose.model('tags', tagSchema, 'tags');

exports.Tag = Tag;
