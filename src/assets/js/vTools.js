// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function colorRgb(sc) {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor = sc.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return sColorChange;
  } else {
    return sColor;
  }
}

// 将rgb表示方式转换为hex表示方式
function colorHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = hex < 10 ? 0 + "" + hex : hex;
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var t = 0; t < aNum.length; t += 1) {
        numHex += aNum[t] + aNum[t];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}
// rgb转16进制
function colorRGBtoHex(color) {
  var rgb = color.split(",");
  var r = parseInt(rgb[0].split("(")[1]);
  var g = parseInt(rgb[1]);
  var b = parseInt(rgb[2].split(")")[0]);
  var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}
// 工具类
let tools = {
  /**
   * 颜色渐变
   * @param {*} startColor 开始值
   * @param {*} endColor 结束值
   * @param {*} step 级别
   * @param {*} type 转出类型 默认值rgb，可选 rgb/16/rgba
   */
  gradientColor(startColor, endColor, step, type = "rgb") {
    let startRGB = colorRgb(startColor);
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];
    let endRGB = colorRgb(endColor);
    let endR = endRGB[0];
    let endG = endRGB[1];
    let endB = endRGB[2];
    let sR = (endR - startR) / step;
    let sG = (endG - startG) / step;
    let sB = (endB - startB) / step;
    var colorArr = [];
    for (var i = 0; i < step; i++) {
      //计算每一步的hex值
      var hex = colorHex(
        "rgb(" +
        parseInt(sR * i + startR) +
        "," +
        parseInt(sG * i + startG) +
        "," +
        parseInt(sB * i + startB) +
        ")"
      );
      let color = hex;
      if (type == "16") color = colorRGBtoHex(hex);
      colorArr.push(color);
    }
    return colorArr;
  },

  /**
   * 16进制颜色转不透明16进制颜色
   * @param {*} str 颜色
   */
  color16ToOpacity16(str) {
    let newStr = str.slice(0, 1) + "E5" + str.slice(1);
    return newStr.split("#")[1];
  }
};

export default {
  tools
};
