const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opid: '',
    date: '2018-12-19'
  },
  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
  },
  //获取openid
  onGetOpenid: function() {
    let that = this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        that.setData({
          opid: app.globalData.openid
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  //模板消息提交
  formSubmit(e) {
    let openid = app.globalData.openid
    console.log('提交的openid为', openid)
    let formId = e.detail.formId
    let values = e.detail.value
    let site = values.site
    let date = values.date
    let uname = values.uname
    let unumber = values.unumber
    wx.request({
      url: 'test.php', // 仅为示例，并非真实的接口地址
      data: {
        openid: openid,
        date: date,
        formId: formId,
        site: site,
        date: date,
        uname: uname,
        unumber: unumber
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
   
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
   
  },
  formReset() {
    console.log('form发生了reset事件')
  },
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var that = this;
    // app.getOpenid().then(function (res) {
    //   if (res.status == 200) {
    //     that.setData({
    //       openid: wx.getStorageSync('openid')
    //     })
    //   } else {
    //     console.log(res.data);
    //   }
    // })
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