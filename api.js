var website = 'https://....com';
// var website = 'https://...com'; // 测试域名

function _matchingAPI(obj){
  return new Promise((resolve, reject) => {
    wx.request({
      url: website + obj.url,
      method: obj.type,
      data: obj.data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: resolve,
      fail: function (res) {
        wx.showModal({
          title: '网络错误',
          content: '请检查您的网络是否正常',
        })
      }
    })
  })
};

module.exports = {
  matchingAPI: function(obj){
    return _matchingAPI(obj).then(res => res.data)
  },
}
