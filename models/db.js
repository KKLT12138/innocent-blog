var mongoose = require('mongoose');
var dbPath = require('../config/db.json').DbPath;
mongoose.connect(dbPath);
var db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
    console.log('连接成功!');
});

exports.mongoose = mongoose;