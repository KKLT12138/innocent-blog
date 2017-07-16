var db = require('./db');
var mongoose = db.mongoose;

var auserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    salt: {
      type: String
    },
    lastIp: {
      type: String
    },
    currentIp: {
      type: String
    },
    lastDate: {
      type: Number
    },
    currentDate: {
      type: Number
    },
    createDate: {
      type: Number
    }
  },
  {
    collection: 'auser'
  });

Auser = mongoose.model('auser', auserSchema, 'auser');

exports.Auser = Auser;

// AuserModel.find({}, function (err, docs) {
//     console.log(docs);
// })

