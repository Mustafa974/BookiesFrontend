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