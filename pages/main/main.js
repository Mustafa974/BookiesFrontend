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
          url: '/assets/images/shuffling/books1.jpeg'
        }, {
          link: '/pages/mine/mine',
          url: '/assets/images/shuffling/books2.jpeg'
        }, {
          link: '/pages/mine/mine',
          url: '/assets/images/shuffling/books3.jpeg'
        }, {
          link: '/pages/mine/mine',
          url: '/assets/images/shuffling/books4.jpeg'
        }
      ]
    },

    // select
    selectOrder: '筛选方式 ▼',
    show: 0,
    index: 0,
    columns: ['价格最低', '销量最高', '智能推荐'],

    // books info
    booksInfo:[{
        id: 111,
        title: '追风筝的人',
        imgSrc: '/assets/images/img/img_kite.png',
        price: '￥20.48',
        author: '卡勒德·胡塞尼'
    }, {
        id: 222,
        title: '活着',
        imgSrc: '/assets/images/img/img_live.png',
        price: '￥23.00',
        author: '余华'
      }, {
        id: 333,
        title: '罗生门',
        imgSrc: '/assets/images/img/img_lsm.png',
        price: '￥30.50',
        author: '芥川龙之介'
      }, {
        id: 444,
        title: '月亮与六便士',
        imgSrc: '/assets/images/img/img_moon.png',
        price: '￥18.99',
        author: '毛姆'
      }, {
        id: 555,
        title: '皮囊',
        imgSrc: '/assets/images/img/img_pn.png',
        price: '￥22.49',
        author: '蔡崇达'
      }, {
        id: 666,
        title: '人间失格',
        imgSrc: '/assets/images/img/img_rjsg.png',
        price: '￥15.66',
        author: '太宰治'
      }, {
        id: 777,
        title: '小王子',
        imgSrc: '/assets/images/img/img_prince.png',
        price: '￥19.77',
        author: '安托万·德·圣埃克苏佩里'
      }, {
        id: 888,
        title: '挪威的森林',
        imgSrc: '/assets/images/img/img_norway.png',
        price: '￥28.90',
        author: '村上春树'
      },
    ]

  },

  //  pages functions
  onLoad: function(options) {
    var that = this;
    // get initial cards
    // that.loadData();

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
  toPage(event) {
    var bookid = event.currentTarget.dataset.bid
    var index = event.currentTarget.dataset.index
    console.log(bookid+' and '+index)
    wx.navigateTo({
      url: '../mainCard/mainCard?bookid='+bookid+'&index='+index
    })
  }

  // wxml functions end
})