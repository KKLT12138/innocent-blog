var Canvas = require('canvas');
var Image = Canvas.Image;

function drawImg(width, height, line) {
  var canvas = new Canvas(width, height);
  var ctx = canvas.getContext('2d');

  ctx.width = width;
  ctx.height = height;

  ctx.beginPath();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.closePath();
  //画线
  for (var i = 0; i < line; i++) {
    var color = '#' + ((Math.random() * 0x323045 + 0x283833) << 0).toString(16);
    var y1 = Math.random() * height;
    var y2 = Math.random() * height;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.lineTo(0, y1);
    ctx.lineTo(width, y2);
    ctx.stroke();
    ctx.closePath();
  }

  ctx.font = '20px "Microsoft Yahei"';
  //取字符
  var numberArr = [
    '零壹贰叁肆伍陆柒捌玖',
    '〇一二三四五六七八九',
    '0123456789'
  ];
  var operationArr = ['加','减','乘','+','-','x'];

  var firstNumb = Math.floor(Math.random() * 10);
  var secondNumb = Math.floor(Math.random() * 10);
  var operation = Math.floor(Math.random() * operationArr.length);

  drawText(numberArr[Math.floor(Math.random() * numberArr.length)][firstNumb], width * 0, 28);
  drawText(operationArr[operation], width * 0.2, 28);
  drawText(numberArr[Math.floor(Math.random() * numberArr.length)][secondNumb], width * 0.4, 28);
  drawText('=', width * 0.6, 28);
  drawText('?', width * 0.8, 28);



  //计算
  var verifyCode;
  switch (operation) {
    case 0:
      verifyCode = firstNumb + secondNumb;
      break;
    case 1:
      verifyCode = firstNumb - secondNumb;
      break;
    case 2:
      verifyCode = firstNumb * secondNumb;
      break;
    case 3:
      verifyCode = firstNumb + secondNumb;
      break;
    case 4:
      verifyCode = firstNumb - secondNumb;
      break;
    case 5:
      verifyCode = firstNumb * secondNumb;
      break;
  }

  var imgUrl = canvas.toDataURL();

  function drawText(text, x, y) {
    ctx.beginPath();
    var angle = Math.random() / 12;
    if (Math.random() > 0.5) {
      angle = -angle;
    }
    var color = '#' + (Math.random() * 0xffffff << 0).toString(16);
    ctx.fillStyle = color;
    ctx.rotate(angle);
    ctx.fillText(text, x, y);
    ctx.closePath();
  }

  return {
    imgUrl: imgUrl,
    verifyCode: verifyCode
  }
}

module.exports.drawImg = drawImg;

