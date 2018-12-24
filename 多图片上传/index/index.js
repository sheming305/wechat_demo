const app = getApp()

Page({
  data: {
    pics: []
  },
  // 选择图片
  chooseImg() {
    var that = this,
      　pics = this.data.pics;

    wx.chooseImage({
      count: 9 - pics.length, // 最多可以选择的图片张数，这里选择的是9张
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        console.log(res);
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);

        that.setData({
          pics
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  //上传
  uploadImg() {
    var pics = this.data.pics;
    // app.uploadimg()这个方法是写在app.js里的，可以去那里查看详细代码
    app.uploadimg({
      url: 'http://127.0.0.1:8081/profile', //这里是你图片上传的接口（这里是测试接口）
      path: pics //这里是选取的图片的地址数组
    });
  },
  // 删除图片
  clearImg(e) {
    console.log(e);
    let Index = e.currentTarget.dataset.index;
    let pics = this.data.pics;
    pics.splice(Index, 1);
    this.setData({
      pics
    });
  },
  //预览图片
  previewImg(e) {
    let Index = e.currentTarget.dataset.index;

    wx.previewImage({
      urls: this.data.pics,
      current: this.data.pics[Index]
    })
  },
  onLoad: function() {

    // console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
})