// pages/my-components/my_updateFile.js
Page({
  data: {
    imgSrc:'',
    downimgSrc:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },
  updateImg:function(){
    let that = this
    wx.chooseImage({
      count: 1,//默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        // console.log(tempFilePaths)
        
        // 用于显示图片的
        that.setData({ imgSrc: tempFilePaths[0]})
         
        //上传图片
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'fileup',
          // formData: {
          //   user: 'test'
          // },
          success(res) {
            const data = res.data
            // do something
            console.log(data)
          },
          fail(err){
            console.log('图片上传出错了')
          }
        })

        
      }
    })
  },
  //下载图片
  downImg:function(){
    let that = this
    wx.downloadFile({
      url: 'https://example.com/audio/123', // 仅为示例，并非真实的资源
      success(res) {
        that.setData({ downimgSrc: res.tempFilePath})
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        // if (res.statusCode === 200) {
        //   wx.playVoice({
        //     filePath: res.tempFilePath
        //   })
        // }
      }
    })
  },


//登陆
  login:function(){
    wx.login({
      success(res){
        console.log(res)
        console.log(res.code)
        wx.request({
          url: 'login.php', // 仅为示例，并非真实的接口地址
          data: {
           code:res.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
          }
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.updateImg()
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })

  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})