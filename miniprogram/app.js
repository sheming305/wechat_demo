//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:'shemingming19-551fda',
        traceUser: true,
      })
    }
    this.globalData = {}
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.globalData.openid = res.result.openid
      }
    })
  },


  // getOpenid: function () {
  //   var that = this;
  //   return new Promise(function (resolve, reject) {
  //     wx.login({
  //       success: function (res) {
  //         // console.log(res.code)
  //         //code 获取用户信息的凭证
  //         if (res.code) {
  //           //请求获取用户openid
  //           wx.request({
  //             url: "https://pig.intmote.com/wxApp/user/getOpenid.do",
  //             data: { "code": res.code },
  //             method: 'GET',
  //             header: {
  //               'Content-type': 'application/json'
  //             },
  //             success: function (res) {
  //               // console.log(res.data.openid)
  //               wx.setStorageSync('openid', res.data.openid);//存储openid
  //               var res = {
  //                 status: 200,
  //                 data: res.data.openid
  //               }
  //               resolve(res);
  //             }
  //           });
  //         } else {
  //           console.log('获取用户登录态失败！' + res.errMsg)
  //           reject('error');
  //         }
  //       }
  //     })
  //   });
  // },
})
