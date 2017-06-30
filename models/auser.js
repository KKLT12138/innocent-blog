var db = require('./db');
var mongoose = db.mongoose;

var auserSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    password: String,
    lastIp: String,
    currentIp: String,
    lastDate: String,
    currentDate: String
  },
  {
    collection: 'auser'
  });

Auser = mongoose.model('auser', auserSchema, 'auser');

exports.Auser = Auser;

// AuserModel.find({}, function (err, docs) {
//     console.log(docs);
// })

