var db = require('./db');
var mongoose = db.mongoose;

var categorySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      unique: true
    },
    category: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    collection: 'categories'
  });

Category = mongoose.model('categories', categorySchema, 'categories');

exports.Category = Category;
