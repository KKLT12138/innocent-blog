var db = require('./db');
var mongoose = db.mongoose;

var auserSchema = new mongoose.Schema({name: String}, {collection: 'auser'});

Auser = mongoose.model('auser', auserSchema, 'auser');

exports.Auser = Auser;

// AuserModel.find({}, function (err, docs) {
//     console.log(docs);
// })

