// pages/mine/mine.js

const app = getApp()

Page({
  data: {
    // userInfo
    userInfo: {}
  },

  // datas needs to refresh
  onShow: function() {
    var that = this
    // 获取用户信息
    that.setData({
      userInfo: app.globalData.userInfo
    })
    console.log("用户信息：", that.data.userInfo, app.globalData.avatarUrl)
    // if (app.globalData.loginStatus) {
    //   that.setData({
    //     userInfo: app.globalData.userInfo
    //   })
    //   console.log("用户信息：", that.data.userInfo, app.globalData.avatarUrl)
    // }
  },

  // page functions
  changeUserInfo: function() {
    wx.navigateTo({
      url: '../editInfo/editInfo',
    })
  },

  onClickCart: function() {
    wx.switchTab({
      url: '../cart/cart',
    })
  },

  onClickHistory: function () {
    wx.switchTab({
      url: '../history/history',
    })
  }

})