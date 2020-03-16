var app = getApp();
let md = require('md5.js')
let encrypt = function (parms) {
  const s1 = parms + 'S4AW7ER39DF8SF6R';
  const s2 = md(s1)
  return s2
}
module.exports = encrypt;