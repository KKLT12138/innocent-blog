var crypto = require('crypto');
/**
 * md5 hash散列
 * @param string 源字符串
 * @return string 32位小写16进制表示的md5散列的字符串
 */
var md5Hash = function(string) {
  var md5 = crypto.createHash('md5');
  md5.update(string);
  var str = md5.digest('hex');
  return str;
};

module.exports = md5Hash;