// pages/my_wechatPay/my_wechatPay.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    console.log(getApp().globalData.openid)
    wx.login({
      success(res) {
        if (res.code) {
          // console.log(res.code)
          that.data.code = res.code
          // console.log(that.data.code)
          // 发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  wxpay() {
    let code = this.data.code
    console.log(code)
    wx.request({
      method:'POST',
      url: 'https://api.mch.weixin.qq.com/pay/unifiedorder', // 此处为示例地址,需调用微信统一下单的api实际的后台接口
      data: {
       code:code
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)//返回的为支付的配置信息
        // 发起支付的请求
        let data = res.data
        wx.requestPayment({
          timeStamp: 'data.timeStamp',//时间戳
          nonceStr: 'data.nonceStr',
          package: 'data.package',
          signType: 'MD5', //默认
          paySign: 'data.paySign',
          success(res) { 
            console.log('支付成功')
          },
          fail(res) { }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})