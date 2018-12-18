const app = getApp()
// import qqmap from '../utils/map.js';
Page({
  data: {
    //下面是字母排序
    letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    cityListId: '',
    //下面是城市列表信息，这里只是模拟数据
    citylist: [{ "letter": "A", "data": [{ "id": "v7", "cityName": "安徽" }] }, { "letter": "B", "data": [{ "id": "v10", "cityName": "巴中" }, { "id": "v4", "cityName": "包头" }, { "id": "v1", "cityName": "北京" }] }, { "letter": "C", "data": [{ "id": "v15", "cityName": "成都" }] }, { "letter": "D", "data": [{ "id": "v21", "cityName": "稻城" }] }, { "letter": "G", "data": [{ "id": "v17", "cityName": "广州" }, { "id": "v29", "cityName": "桂林" }] }, { "letter": "H", "data": [{ "id": "v9", "cityName": "海南" }, { "id": "v3", "cityName": "呼和浩特" }] }, { "letter": "L", "data": [{ "id": "v24", "cityName": "洛阳" }, { "id": "v20", "cityName": "拉萨" }, { "id": "v14", "cityName": "丽江" }] }, { "letter": "M", "data": [{ "id": "v13", "cityName": "眉山" }] }, { "letter": "N", "data": [{ "id": "v27", "cityName": "南京" }] }, { "letter": "S", "data": [{ "id": "v18", "cityName": "三亚" }, { "id": "v2", "cityName": "上海" }] }, { "letter": "T", "data": [{ "id": "v5", "cityName": "天津" }] }, { "letter": "W", "data": [{ "id": "v12", "cityName": "乌鲁木齐" }, { "id": "v25", "cityName": "武汉" }] }, { "letter": "X", "data": [{ "id": "v23", "cityName": "西安" }, { "id": "v28", "cityName": "香港" }, { "id": "v19", "cityName": "厦门" }] }, { "letter": "Z", "data": [{ "id": "v8", "cityName": "张家口" }] }],
    //下面是热门城市数据，模拟数据
    newcity: ['北京', '上海', '广州', '深圳', '成都', '杭州'],
    // citySel: '全国',
    locateCity: ''
  },
  onLoad: function () {
    console.log(getApp());
    let that = this,
      cityOrTime = wx.getStorageSync('locatecity') || {},
      time = new Date().getTime(),
      city = '';
    if (!cityOrTime.time || (time - cityOrTime.time > 1800000)) {//每隔30分钟请求一次定位
      // this.getLocate();
    } else {//如果未满30分钟，那么直接从本地缓存里取值
      that.setData({
        locateCity: cityOrTime.city
      })
    }
  },
  cityTap(e) {
    const val = e.currentTarget.dataset.val || '',
      types = e.currentTarget.dataset.types || '',
      Index = e.currentTarget.dataset.index || '',
      that = this;
    let city = this.data.citySel;
    switch (types) {
      case 'locate':
        //定位内容
        city = this.data.locateCity;
        break;
      case 'national':
        //全国
        city = '全国';
        break;
      case 'new':
        //热门城市
        city = val;
        break;
      case 'list':
        //城市列表
        city = val.cityName;
        break;
    }
    if (city) {
      wx.setStorage({
        key: 'city',
        data: city
      })
      　　　　//点击后给父组件可以通过bindcitytap事件，获取到cityname的值，这是子组件给父组件传值和触发事件的方法
      // this.triggerEvent('citytap', { cityname: city });
    } else {
      // console.log('还没有');
      wx.showModal({
        title: '提示',
        content: '这里自动定位需要的话可以看博客，这里主要只是点首字母跳转',
      })
      // this.getLocate();
    }

  },
  //点击城市字母
  letterTap(e) {
    const Item = e.currentTarget.dataset.item;
    this.setData({
      cityListId: Item
    });
    console.log(this.data.cityListId);
  },
  //调用定位
  // getLocate() {
  //   let that = this;
  //   new qqmap().getLocateInfo().then(function (val) {//这个方法在另一个文件里，下面有贴出代码
  //     console.log(val);
  //     if (val.indexOf('市') !== -1) {//这里是去掉“市”这个字
  //       console.log(val.indexOf('市') - 1);
  //       val = val.slice(0, val.indexOf('市'));
  //       console.log(val);
  //     }
  //     that.setData({
  //       locateCity: val
  //     });
  //     //把获取的定位和获取的时间放到本地存储
  //     wx.setStorageSync('locatecity', { city: val, time: new Date().getTime() });
  //   });
  // }
})
