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
        orderId: 1111111,
        order_time: "2019-02-14 08:54:17",
        total_price: 49.41,
        total_count: 3,
        status: 2,
        receiver_name: '穆斯塔法',
        receiver_number: 12345678910,
        receiver_address: '上海市嘉定区同济大学嘉定校区',
        deliver_fee: 7,
        orderList: [
          {
            id: 0,
            name: "追风筝的人",
            author: "卡勒德·胡塞尼",
            price: 20.48,
            isbn: "9787208061644",
            cover_url: "/assets/images/img/img_kite.png",
            publisher: "上海人民出版社",
            discount: 0.7,
            count: 2,
          }, {
            id: 1,
            name: "活着",
            author: "余华",
            price: 23.04,
            isbn: "9787506365437",
            cover_url: "/assets/images/img/img_live.png",
            publisher: "作家出版社",
            discount: 0.9,
            count: 1,
          },
        ],
      },
      {
        orderId: 2222222,
        order_time: "2019-03-05 23:19:56",
        total_price: 64.09,
        total_count: 3,
        status: 0,
        receiver_name: 'Liebling.',
        receiver_number: 12345678910,
        receiver_address: '上海市嘉定区同济大学嘉定校区',
        deliver_fee: 9,
        orderList: [
          {
            id: 2,
            name: "罗生门",
            author: "芥川龙之介",
            price: 30.52,
            isbn: "9787208061644",
            cover_url: "/assets/images/img/img_lsm.png",
            publisher: "上海人民出版社",
            discount: 0.7,
            count: 3,
          },
        ],
      },
      {
        orderId: 3333333,
        order_time: "2019-03-15 17:35:09",
        total_price: 65.60,
        total_count: 4,
        status: 1,
        receiver_name: '卤蛋冬瓜',
        receiver_number: 12345678910,
        receiver_address: '上海市嘉定区同济大学嘉定校区',
        deliver_fee: 8,
        orderList: [
          {
            id: 3,
            name: "月亮与六便士",
            author: "毛姆",
            price: 18.99,
            isbn: "9787506365437",
            cover_url: "/assets/images/img/img_moon.png",
            publisher: "作家出版社",
            discount: 0.9,
            count: 1,
          }, {
            id: 4,
            name: "皮囊",
            author: "蔡崇达",
            price: 22.49,
            isbn: "9787208061644",
            cover_url: "/assets/images/img/img_pn.png",
            publisher: "上海人民出版社",
            discount: 0.8,
            count: 2,
          }, {
            id: 5,
            name: "人间失格",
            author: "太宰治",
            price: 15.66,
            isbn: "9787506365437",
            cover_url: "/assets/images/img/img_rjsg.png",
            publisher: "作家出版社",
            discount: 0.8,
            count: 1,
          },
        ],
      },
    ],
    // order list of different status
    orderList0: [
      {
        orderId: 2222222,
        order_time: "2019-03-05 23:19:56",
        total_price: 64.09,
        total_count: 3,
        status: 0,
        receiver_name: 'Liebling.',
        receiver_number: 12345678910,
        receiver_address: '上海市嘉定区同济大学嘉定校区',
        deliver_fee: 9,
        orderList: [
          {
            id: 2,
            name: "罗生门",
            author: "芥川龙之介",
            price: 30.52,
            isbn: "9787208061644",
            cover_url: "/assets/images/img/img_lsm.png",
            publisher: "上海人民出版社",
            discount: 0.7,
            count: 3,
          },
        ],
      },
    ],
    orderList1: [
      {
        orderId: 3333333,
        order_time: "2019-03-15 17:35:09",
        total_price: 65.60,
        total_count: 4,
        status: 1,
        receiver_name: '卤蛋冬瓜',
        receiver_number: 12345678910,
        receiver_address: '上海市嘉定区同济大学嘉定校区',
        deliver_fee: 8,
        orderList: [
          {
            id: 3,
            name: "月亮与六便士",
            author: "毛姆",
            price: 18.99,
            isbn: "9787506365437",
            cover_url: "/assets/images/img/img_moon.png",
            publisher: "作家出版社",
            discount: 0.9,
            count: 1,
          }, {
            id: 4,
            name: "皮囊",
            author: "蔡崇达",
            price: 22.49,
            isbn: "9787208061644",
            cover_url: "/assets/images/img/img_pn.png",
            publisher: "上海人民出版社",
            discount: 0.8,
            count: 2,
          }, {
            id: 5,
            name: "人间失格",
            author: "太宰治",
            price: 15.66,
            isbn: "9787506365437",
            cover_url: "/assets/images/img/img_rjsg.png",
            publisher: "作家出版社",
            discount: 0.8,
            count: 1,
          },
        ],
      },
    ],
    orderList2: [
      {
        orderId: 1111111,
        order_time: "2019-02-14 08:54:17",
        total_price: 49.41,
        total_count: 3,
        status: 2,
        receiver_name: '穆斯塔法',
        receiver_number: 12345678910,
        receiver_address: '上海市嘉定区同济大学嘉定校区',
        deliver_fee: 7,
        orderList: [
          {
            id: 0,
            name: "追风筝的人",
            author: "卡勒德·胡塞尼",
            price: 20.48,
            isbn: "9787208061644",
            cover_url: "/assets/images/img/img_kite.png",
            publisher: "上海人民出版社",
            discount: 0.7,
            count: 2,
          }, {
            id: 1,
            name: "活着",
            author: "余华",
            price: 23.04,
            isbn: "9787506365437",
            cover_url: "/assets/images/img/img_live.png",
            publisher: "作家出版社",
            discount: 0.9,
            count: 1,
          },
        ],
      },
    ],
  },

  //load group list
  onLoad: function (options) {
    var that = this
    var wechaId = app.globalData.openId
    wx.request({
      url: 'http://101.132.69.33:8080/order/getAll?page=0&wxId=' + wechaId,
      success: res => {
        if(res.statusCode==200){
          var orderlist = res.data
          for(var i = 0; i < orderlist.length; i++){
            var date = orderlist[i].orderTime.substring(0,10)
            var time = orderlist[i].orderTime.substring(11, 19)
            orderlist[i].orderTime = date + ' ' + time
            console.log(orderlist[i].orderTime)
          }
          that.setData({
            ordersInfo: orderlist
          })
          console.log(that.data.ordersInfo)
        }
        else{
          console.log("获取历史订单失败")
        }
      }
    })
    that.loadByStatus(0)
    that.loadByStatus(1)
    that.loadByStatus(2)
  },

  loadByStatus:function(detail){
    var that = this
    var wechaId = app.globalData.openId
    console.log("load by status")
    wx.request({
      url: 'http://101.132.69.33:8080/order/getByStatus?status='+detail+'&wxId=' + wechaId,
      success: res => {
        if (res.statusCode == 200) {
          var orderlist = res.data
          for (var i = 0; i < orderlist.length; i++) {
            var date = orderlist[i].orderTime.substring(0, 10)
            var time = orderlist[i].orderTime.substring(11, 19)
            orderlist[i].orderTime = date + ' ' + time
            console.log(orderlist[i].orderTime)
          }
          if(detail==0){
            that.setData({
              orderList0: orderlist
            })
          }
          if (detail == 1) {
            that.setData({
              orderList1: orderlist
            })
          }
          if (detail == 2) {
            that.setData({
              orderList2: orderlist
            })
          }
          console.log(that.data.ordersInfo)
        }
        else {
          console.log("获取历史订单失败")
        }
      }
    })
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