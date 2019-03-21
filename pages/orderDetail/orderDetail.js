// pages/cart/cart.js 
const app = getApp()

Page({

  data: {

  },

  //load group list
  onLoad: function (detail) {
    var cartidList = detail.cartidList.split(',')
    console.log(cartidList)
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