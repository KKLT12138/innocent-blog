var crypto = require('crypto');

/**
 * 加密算法（md5 → 加盐 → md5）
 * 依赖: crypto
 * @param string 源字符串
 * @param salt 盐
 * @returns {string}
 */
function communism(string, salt) {
  var str = md5Hash(string);
  str = salt + str;
  str = md5Hash(str);
  return str;
}

/**
 * md5 hash散列
 * @param string 源字符串
 * @return string 32位小写16进制表示的md5散列的字符串
 */
function md5Hash(string) {
  var md5 = crypto.createHash('md5');
  md5.update(string);
  var str = md5.digest('hex');
  return str;
}

/**
 * 生成盐
 * @param length 盐的长度
 * @returns {string}
 */
function setSalt(length) {
  var salt = '';
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var length = length;
  if (length > 256) {
    length = 256;
  }
  for (var i = 0; i < length; i++) {
    salt += chars[Math.floor(Math.random() * chars.length)];
  }
  return salt;
}

module.exports = {
  communism: communism,
  md5Hash: md5Hash,
  setSalt: setSalt
};