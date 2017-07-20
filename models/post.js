var db = require('./db');
var mongoose = db.mongoose;

var postSchema = new mongoose.Schema(
  {
    title : {
      type: String,
      required: true
    },
    author : {
      type: String,
      required: true
    },
    category : {
      type: String,
      required: true
    },
    tags : {
      type: [String],
      required: true
    },
    order : {
      type: Number,
      required: true
    },
    date : {
      type: Number,
      required: true
    },
    reading : {
      type: Number,
      required: true
    },
    content : {
      type: String,
      required: true
    }
  },
  {
    collection: 'posts'
  });

Post = mongoose.model('posts', postSchema, 'posts');

exports.Post = Post;
