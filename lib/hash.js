// var crypto = require('crypto');

/**
 * 加密算法（md5 → 加盐 → md5）
 * 依赖: crypto
 * @param string 源字符串
 * @param length 盐的长度，建议设置为32
 * @returns {string}
 */
var communism = function(string, length) {
  var str = md5Hash(string);

  var salt = (function () {
    var str = '';
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    for (var i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  })();

  str = salt + str;
  str = md5Hash(str);
  return str;
};

module.exports = communism;