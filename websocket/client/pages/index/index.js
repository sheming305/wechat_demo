let socket
Page({
  data: {
    stock: {
      ruanmou: 100,
      tencent: 95,
      JD: 50
    },
    flag: {
      ruanmou: '',
      tencent: '',
      JD: ''
    }
  },
  connect () {
    let _this = this
    socket = wx.connectSocket({
      url: 'ws://localhost:8080'
    })
    socket.onMessage(data => {
      // console.log(data)
      let stockData = JSON.parse(data.data)
      // _this.setData({
      //   stock: stockData
      // })
      let orginalStockData = _this.data.stock
      let flag = this.data.flag
      for (let i in stockData) {
        flag[i] = _this.changeflag(orginalStockData[i], stockData[i])
      }
      _this.setData({
        stock: stockData,
        flag
      })
    })
  },
  changeflag (orignalValue, newValue) {
    if (newValue < orignalValue) {
      return 'down'
    } else if (newValue > orignalValue) {
      return 'up'
    }
  }
})
