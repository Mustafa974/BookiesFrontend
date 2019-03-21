// pages/orderDetail/orderDetail.js
const app = getApp()

Page({

  data: {
    cartidList: [],
  },

  //load group list
  onLoad: function (detail) {
    var that = this
    var list = detail.cartidList.split(',')
    that.setData({
      cartidList: list,
    })
    console.log(that.data.cartidList)
  },

  //pay
  pay:function(e){

  },

  //jump to order page
  toOrderPage:function(e){
    var bookid = e.currentTarget.dataset.bookid
    console.log(bookid)
    wx.navigateTo({
      url: '../history/history'
    })
  }

})