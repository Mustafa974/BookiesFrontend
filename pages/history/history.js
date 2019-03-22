// pages/history/history.js 
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    // orders info
    ordersInfo: [],
    // order list of different status
    orderList0: [],
    orderList1: [],
    orderList2: [],

    orderId: 0,
    show01: false,
    show02: false,
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

  onShow:function(e){
    var that = this
    that.onLoad()
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

  //confirm pay
  onConfirmPay:function(e){
    var that = this
    that.setData({
      show01: true,
      orderId: e.currentTarget.dataset.orderid,
    })
  },

  //confirm delivery
  onConfirmDelivery: function (e) {
    var that = this
    that.setData({
      show02: true,
      orderId: e.currentTarget.dataset.orderid,
    })
  },

  //on cancel confirm
  onCancel:function(e){
    var that = this
    that.setData({
      show01: false,
      show02: false,
    })
  },

  //pay
  onPay: function (e) {
    var that = this
    var orderId = that.data.orderId
    console.log("onpay, order id is "+orderId)
    wx.request({
      url: 'http://101.132.69.33:8080/order/pay?orderId='+orderId,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
      },
      success: res => {
        if (res.statusCode == 200) {
          that.setData({
            show01: false,
          })
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
          that.onLoad()
        }
        else {
          wx.showToast({
            title: '支付失败！',
            icon: 'none',
            duration: 1300
          });
          console.log("支付失败")
        }
      }
    })
  },

  //confirm delivery
  onDelivery: function (e) {
    var that = this
    var orderId = that.data.orderId
    console.log("ondelivery, order id is " + orderId)
    wx.request({
      url: 'http://101.132.69.33:8080/order/confirm?orderId=' + orderId,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
      },
      success: res => {
        if (res.statusCode == 200) {
          that.setData({
            show02: false,
          })
          wx.showToast({
            title: '确认收货成功',
            icon: 'success',
            duration: 2000
          })
          that.onLoad()
        }
        else {
          wx.showToast({
            title: '确认收货失败！',
            icon: 'none',
            duration: 1300
          });
          console.log("确认收货失败")
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