Page({

  /**
   * 页面的初始数据
   */
  data: {
    week: ['sun', 'mon', 'tues', 'wed', 'ther', 'fir', 'sat'],//星期英文
    monthEnglish: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],//12个月份的英文
    dateArr: [],//三个月份的日历数据
    today: 0,//选择的今天的下标
    swiperIndex: 1,//当前swiper所在的位置
    dates: [],//最近三个月的年份和月份
  },
  // 点击日历
  dateTap(e) {
    let Index = e.currentTarget.dataset.index,
      Item = e.currentTarget.dataset.item;
    console.log(Index);
    console.log('点击的日期：', this.data.dates[this.data.swiperIndex].year, this.data.dates[this.data.swiperIndex].month+1, Item.date, this.data.dates[this.data.swiperIndex], 'date:', Item.date);
    this.setData({
      today: Index + 1
    });
  },
  // 每月日期排列
  dataFn(data) {
    let date = data || new Date();
    let dateArr = [];
    let yue = date.getMonth();//当前计算的月份，这里月份是从0开始的，注意
    let n = date.getFullYear();//当前计算的年份
    let r = date.getDate();//当前计算的日期
    let totalDay = this.dayNum({ month: yue, year: n });//计算出当月的天数
    let lastMonthDay = new Date(n, yue, 0).getDate();//上一个月份的天数

    console.log(yue);//
    let firstDay = new Date(n, yue, 1).getDay();//计算当前月份的1号是星期几
    let lastDay = new Date(n, yue + 1, 0).getDay();//计算下月1号是星期几

    console.log(date.getFullYear() != new Date().getFullYear(), date.getMonth() != new Date().getMonth());

    console.log(totalDay, firstDay, lastDay, lastMonthDay);
    //计算7*6的日期排列
    for (let i = 1; i < 43; i++) {
      dateArr[i - 1] = {};
      if (i <= firstDay) {//计算上月的结束的几天日期在本页面的显示
        dateArr[i - 1].date = lastMonthDay - firstDay + i;
        dateArr[i - 1].bg = '1'
      } else if (i > firstDay + totalDay) {//计算下月开始的几天日期在本页的显示
        dateArr[i - 1].date = i - firstDay - totalDay;
        dateArr[i - 1].bg = '1'
      } else {
        dateArr[i - 1].date = i - firstDay;
        dateArr[i - 1].bg = '2'
      }
    }
    console.log(dateArr);
    // this.setData({ today});
    return dateArr;

  },
  // 滑动每月日历
  swiperChange(e) {
    console.log(e);
    let Index = e.detail.current;
    let swiperIndex = this.data.swiperIndex;

    this.setData({ swiperIndex: Index })
    this.dateChange();
  },
  //滑动后月份和年份的改变
  dateChange() {
    let Index = this.data.swiperIndex;
    let currentYear = this.data.dates[Index].year,
      currentMonth = this.data.dates[Index].month;
    let dates = [{}, {}, {}];
    // 当swiper滑动到不同位置时 更新相应的日期数据
    if (Index == 0) {
      dates[1].month = currentMonth + 1;
      dates[1].year = currentYear;

      dates[2].month = currentMonth - 1;
      dates[2].year = currentYear;

      dates[0].month = currentMonth;
      dates[0].year = currentYear;

    } else if (Index == 1) {

      dates[0].month = currentMonth - 1;
      dates[0].year = currentYear;

      dates[2].month = currentMonth + 1;
      dates[2].year = currentYear;

      dates[1].month = currentMonth;
      dates[1].year = currentYear;

    } else if (Index == 2) {
      dates[0].month = currentMonth + 1;
      dates[0].year = currentYear;

      dates[1].month = currentMonth - 1;
      dates[1].year = currentYear;

      dates[2].month = currentMonth;
      dates[2].year = currentYear;
    }
    // console.log('查看：',dates);
    for (let i = 0; i < 3; i++) {
      if (dates[i].month >= 12) {
        dates[i].month = 0;
        dates[i].year = dates[i].year + 1;
      }
      if (dates[i].month <= -1) {
        dates[i].month = 11;
        dates[i].year = dates[i].year - 1;
      }
    }
    console.log('查看所有：', dates, Index);
    this.setData({ dates });
    // 更新天数
    this.updateDate();
  },
  // 判断月份天数
  dayNum(data) {
    // 400  4 !100，判断是否闰年，
    //普通闰年:能被4整除但不能被100整除的年份为普通闰年。（如2004年就是闰年，1999年不是闰年）；
    // 世纪闰年: 能被400整除的为世纪闰年。（如2000年是闰年，1900年不是闰年）；
    data.month += 1;
    if (data.month == 2) {//如果为2月时计算当月天数
      if (data.year % 400 == 0 || (data.year % 4 == 0 && data.year % 100 != 0)) {//闰年
        data.day = 29;
      } else {//平年
        data.day = 28;
      }
    } else if (data.month == 1 || data.month == 3 || data.month == 5 || data.month == 7 || data.month == 8 || data.month == 10 || data.month == 12) {//为31天的月份
      data.day = 31;
    } else {
      data.day = 30;
    }
    return data.day;
  },
  // 更新三个月的日期，这三个月为，当前看到的月份、当前看到的月份的上一月、当前看到的月份的下一月
  updateDate() {
    let arr = [];
    let todayDate = new Date();//今天的年月
    let currentYear = todayDate.getFullYear(),
      currentMonth = todayDate.getMonth(),
      dates = this.data.dates;
    let dateAr = [new Date(dates[0].year, dates[0].month), new Date(dates[1].year, dates[1].month), new Date(dates[2].year, dates[2].month)];
    for (let i = 0; i < 3; i++) {
      arr[i] = this.dataFn(dateAr[i]);
    }
    console.log(arr);
   
    let firstDay = new Date(currentYear, currentMonth ,1).getDay();//计算本月1号是星期几
    let today = firstDay + new Date().getDate();//计算今天的标记
    let date = new Date(dates[this.data.swiperIndex].year, dates[this.data.swiperIndex].month);
    // 如果不是本月  则不显示标记
    if (date.getFullYear() != new Date().getFullYear() || date.getMonth() != new Date().getMonth()) {
      today = -1;
    }
    this.setData({ dateArr: arr, today });
  },
  onLoad: function (options) {
    // 初始化三个月的天数数据
    let datesArr = [];
    for (let i = 0; i < 3; i++) {
      datesArr[i] = {};
      datesArr[i].year = new Date(new Date().getFullYear(), new Date().getMonth() + i - 1).getFullYear();
      datesArr[i].month = new Date(new Date().getFullYear(), new Date().getMonth() + i - 1).getMonth();
    }
    this.setData({
      dates: datesArr
    });
    this.updateDate();


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.timeScope = this.selectComponent('#timeScope');
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