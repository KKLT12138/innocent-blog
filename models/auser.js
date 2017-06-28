var db = require('./db');
var mongoose = db.mongoose;

var auserSchema = new mongoose.Schema({}, {collection: 'auser'});

AuserModel = mongoose.model('auser', auserSchema, 'auser');

exports.AuserModel = AuserModel;

// AuserModel.find({}, function (err, docs) {
//     console.log(docs);
// })