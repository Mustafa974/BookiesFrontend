// pages/main/main.js

//获取应用实例
const app = getApp()
const allInfoUrl ='http://101.132.69.33:2333/viewInfo/getInfoByScreened/'
Page({
  // initial datas
  data: {

    // Shuffling 
    shufflings: {
      indicatorDots: true,  //是否显示点
      autoplay: true,  //是否自动轮播
      interval: 3500,  //间隔时间
      duration: 2500,  //滑动时间
      imgs: [
        {
          link: '/pages/mine/mine',
          url: '/assets/images/shuffling/books1.jpg'
        }, {
          link: '/pages/mine/mine',
          url: '/assets/images/shuffling/books2.jpg'
        }, {
          link: '/pages/mine/mine',
          url: '/assets/images/shuffling/books3.jpg'
        }, {
          link: '/pages/mine/mine',
          url: '/assets/images/shuffling/books4.jpg'
        }
      ]
    },

    // select
    selectOrder: '筛选方式 ▼',
    show: 0,
    index: 0,
    columns: ['价格最低', '销量最高', '智能推荐'],

    // books info
    booksInfo:[]

  },

  //  pages functions
  onLoad: function(options) {
    var that = this;
    that.setData({
      booksInfo: app.globalData.booksInfo
    })
  },

  // load books info
  loadData: function() {
    var that = this
    wx.request({
      url: 'http://101.132.69.33:2333/viewInfo/getInfoByScreened/' + that.data.selectedLocation + '/' + that.data.selectedSport,
      success(res) {
        var info = res.data
        that.setData({
          books: info
        })
      }
    })
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  // onShow
  onShow: function () {
    var selected = this.data.selectOrder
    // console.log('selected:'+selected)
    if (selected == '筛选方式 ▼' || selected == '价格最低 ▼') {
      // this.loadDataByTime()
      console.log(selected == '筛选方式 ▼' || '价格最低 ▼')
    } else if (selected == '销量最高 ▼') {
      // this.loadDataByMem()
      console.log(selected == '销量最高 ▼')
    } else {
      // this.loadDataByTag()
      console.log(selected == '智能推荐')
    }
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  onClick() {
    this.setData({
      show: true,
    });
  },

  onConfirm(event) {
    var that = this
    const {
      picker,
      value,
      index
    } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      show: false,
      selectOrder: this.data.columns[index] + " ▼",
    })
    if (index == 0) {
      // that.loadDataByTime()
    } else if (index == 1) {
      // that.loadDataByMem()
    } else {
      // that.loadDataByTag()
      console.log('智能排序')
    }
  },

  onCancel() {
    this.setData({
      show: false
    });
  },

  // toPages
  toBookPage(event) {
    var bookid = event.currentTarget.dataset.bookid
    console.log(bookid)
    wx.navigateTo({
      url: '../mainCard/mainCard?bookid='+bookid
    })
  }

  // wxml functions end
})