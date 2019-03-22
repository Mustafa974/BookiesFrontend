// pages/main/main.js

//获取应用实例
const app = getApp()

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
    var that = this
    wx.request({
      url: 'http://101.132.69.33:8080/book/getAll?page=0',
      success: res => {
        if (res.statusCode == 200) {
          var info = res.data
          console.log("请求全部列表成功")
          that.setData({
            booksInfo: info
          })
          app.globalData.booksInfo = info
          console.log("全局数据：")
          console.log(app.globalData.booksInfo)
        }
        else {
          console.log("请求全部书籍列表失败，状态码为：" + res.statusCode)
        }
      }
    })
  },

  // load books info
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //load group list
  loadDataByDefault: function () {
    var that = this
    var wechaId = app.globalData.openId
    wx.request({
      url: 'http://101.132.69.33:8080/book/getAll?page=0',
      success: res => {
        if (res.statusCode == 200) {
          var info = res.data
          console.log("请求全部列表成功")
          that.setData({
            booksInfo: info
          })
        }
        else {
          console.log("请求全部书籍列表失败，状态码为：" + res.statusCode)
        }
      }
    })
  },

  loadDataByPrice: function () {
    var that = this
    var wechaId = app.globalData.openId
    wx.request({
      url: 'http://101.132.69.33:8080/book/getByPrice?page=0',
      success: res => {
        if (res.statusCode == 200) {
          var info = res.data
          console.log("请求价格排序列表成功")
          that.setData({
            booksInfo: info
          })
          app.globalData.booksInfo = info
          console.log("全局数据：")
          console.log(app.globalData.booksInfo)
        }
        else {
          console.log("请求价格排序书籍列表失败，状态码为：" + res.statusCode)
        }
      }
    })
  },

  loadDataBySales: function () {
    var that = this
    var wechaId = app.globalData.openId
    wx.request({
      url: 'http://101.132.69.33:8080/book/getBySales?page=0',
      success: res => {
        if (res.statusCode == 200) {
          var info = res.data
          console.log("请求销量排序列表成功")
          console.log(info)
          that.setData({
            booksInfo: info
          })
          app.globalData.booksInfo = info
          console.log("全局数据：")
          console.log(app.globalData.booksInfo)
        }
        else {
          console.log("请求销量排序书籍列表失败，状态码为：" + res.statusCode)
        }
      }
    })
  },

  // onShow
  onShow: function () {
    var selected = this.data.selectOrder
    // console.log('selected:'+selected)
    if (selected == '筛选方式 ▼' || selected == '智能推荐 ▼') {
      this.loadDataByDefault()
      console.log(selected == '筛选方式 ▼' || '智能推荐 ▼')
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
    this.setData({
      show: false,
      selectOrder: this.data.columns[index] + " ▼",
    })
    // console.log("筛选器下标为"+index)
    if (index == 0) {
      that.loadDataByPrice()
      console.log('价格最低')
    } else if (index == 1) {
      that.loadDataBySales()
      console.log('销量最高')
    } else {
      that.loadDataByDefault()
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
    // console.log(bookid)
    wx.navigateTo({
      url: '../mainCard/mainCard?bookid='+bookid
    })
  }

  // wxml functions end
})