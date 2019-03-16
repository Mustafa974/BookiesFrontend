// pages/history/history.js 
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    // orders info
    ordersInfo: [
      {
        orderId: 111,
        orderTime: "2019-02-14 08:54:17",
        totalPrice: 49.41,
        totalCount: 3,
        orderStatus: 2,
        rName: '顾客1号',
        rNumber: 12345678910,
        rLocation: ['上海市', '上海市', '嘉定区'],
        orderList: [
          {
            id: 0,
            title: "追风筝的人",
            author: "卡勒德·胡塞尼",
            price: 20.48,
            isbn: "9787208061644",
            imgSrc: "/assets/images/img/img_kite.png",
            publisher: "上海人民出版社",
            discount: 0.7,
            count: 2,
            catagory: "小说",
          }, {
            id: 1,
            title: "活着",
            author: "余华",
            price: 23.04,
            isbn: "9787506365437",
            imgSrc: "/assets/images/img/img_live.png",
            publisher: "作家出版社",
            discount: 0.9,
            count: 1,
            catagory: "小说",
          },
        ],
      },
      {
        orderId: 222,
        orderTime: "2019-03-05 23:19:56",
        totalPrice: 64.09,
        totalCount: 3,
        orderStatus: 0,
        rName: '顾客2号',
        rNumber: 12345678910,
        rLocation: ['上海市', '上海市', '杨浦区'],
        orderList: [
          {
            id: 2,
            title: "罗生门",
            author: "芥川龙之介",
            price: 30.52,
            isbn: "9787208061644",
            imgSrc: "/assets/images/img/img_lsm.png",
            publisher: "上海人民出版社",
            discount: 0.7,
            count: 3,
            catagory: "小说",
          },
        ],
      },
      {
        orderId: 333,
        orderTime: "2019-03-15 17:35:09",
        totalPrice: 65.60,
        totalCount: 4,
        orderStatus: 1,
        rName: '顾客1号',
        rNumber: 12345678910,
        rLocation: ['上海市', '上海市', '徐汇区'],
        orderList: [
          {
            id: 3,
            title: "月亮与六便士",
            author: "毛姆",
            price: 18.99,
            isbn: "9787506365437",
            imgSrc: "/assets/images/img/img_moon.png",
            publisher: "作家出版社",
            discount: 0.9,
            count: 1,
            catagory: "小说",
          }, {
            id: 4,
            title: "皮囊",
            author: "蔡崇达",
            price: 22.49,
            isbn: "9787208061644",
            imgSrc: "/assets/images/img/img_pn.png",
            publisher: "上海人民出版社",
            discount: 0.8,
            count: 2,
            catagory: "小说",
          }, {
            id: 5,
            title: "人间失格",
            author: "太宰治",
            price: 15.66,
            isbn: "9787506365437",
            imgSrc: "/assets/images/img/img_rjsg.png",
            publisher: "作家出版社",
            discount: 0.8,
            count: 1,
            catagory: "小说",
          },
        ],
      },
    ]
  },

  //load group list
  onLoad: function (options) {
    // this.initEleWidth();
    var that = this
    var wechaId = app.globalData.openId
    // wx.request({
    //   url: 'http://101.132.69.33:2333/getGroupCircleList/getGCListByTime/' + wechaId,
    //   success: res => {
    //     var info = res.data
    //     that.setData({
    //       cardInfo: info
    //     })
    //     console.log(that.data.cardInfo)
    //   }
    // })
  },

  // toPages
  toPage: function (e) {
    var bookid = e.currentTarget.dataset.bookid
    console.log(bookid)
    wx.navigateTo({
      url: '../mainCard/mainCard?bookid=' + bookid
    })
  },

})