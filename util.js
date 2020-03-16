var Encrypt = require('./encryption.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//格式化参数（自动验签）
const _formatSign = obj => {

  const list = []; //临时数组
  const reObj = {}; //最后返回的正确顺序的参数
  let str = ""; //返回给页面使用
  let timestamp = Date.parse(new Date()).toString().substr(0, 10);

  obj.DeviceType = '3'; // 平台类型
  obj.Version = '3.0.0'; // 小程序版本号
  obj.BuildVersion = '300'; //编译号
  obj.timestamp = timestamp; // 当前时间

  for (var key in obj) {
    list.push(key.toUpperCase());
  };
  list.sort();

  for (var i = 0; i < list.length; i++) {
    for (var key in obj) {
      if (list[i] == key.toUpperCase()) {

        //过滤空值
        if (obj[key] === '' || obj[key] == null || obj[key] == undefined)
        {
          continue;
        }
        else
        {
          reObj[list[i]] = obj[key];
        }

      }
    }
  };

  for (var key in reObj) {
    str += (key + "=" + reObj[key] + "&")
  }

  str = str.substr(0, str.length - 1); 

  return str;
}

//卡路里计算
const _calorieCounting = obj => {

  //计算卡路里
  //sex：0 保密
  //     1 男
  //     2 女
  let stride = 0.75; //男性平均步幅
  let weight = 70.6; //男性平均体重
  if (obj.sex == 2) {
    stride = 0.58; //女性平均步幅
    weight = 58.6; //女性平均体重
  }
  let distance = obj.step * stride / 1000;
  let calorie = (weight * distance * 0.928).toFixed(0);

  return calorie;
}

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
  formatTime: formatTime,
  formatSign: _formatSign,
  calorieCounting: _calorieCounting,
  thousandsSeparator: _thousandsSeparator,
  shortTimeFormatConvert: _shortTimeFormatConvert,
}
