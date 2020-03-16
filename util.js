//数字千位符转换
//number 输入的数字
//n 需要保留几位小数
const _thousandsSeparator = function (number, n) {

  //保留几位小数
  if (n != 0 ) {
    n = (n > 0 && n <= 20) ? n : 2;
  }

  number = parseFloat((number + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  let sub_val = number.split(".")[0].split("").reverse();
  let sub_xs = number.split(".")[1];

  let show_html = "";
  for (let i = 0; i < sub_val.length; i++) {
    show_html += sub_val[i] + ((i + 1) % 3 == 0 && (i + 1) != sub_val.length ? "," : "");
  }

  if (n == 0 ) {
    return show_html.split("").reverse().join("");
  } else {
    return show_html.split("").reverse().join("") + "." + sub_xs;
  }
}

// 10位数时间戳转换
// shortTimeFormatConvert(time, 'yyyy年MM月dd日');
const _shortTimeFormatConvert = function (time, format){
  var date = new Date(time * 1000);
  return format.replace(/yyyy|MM|dd/g, function (item) {
    switch (item) {
      case 'yyyy':
        return date.getFullYear();
        break;
      case 'MM':
        return date.getMonth() + 1;
        break;
      case 'dd':
        return date.getDate();
        break;
    }
  })
}

module.exports = {
  thousandsSeparator: _thousandsSeparator,
  shortTimeFormatConvert: _shortTimeFormatConvert,
}
