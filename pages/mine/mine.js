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
  },

  onClickHistory:function(){
    wx.switchTab({
      url: '../history/history',
    })
  },

  //edit user info
  changeUserInfo:function() {
    wx.navigateTo({
      url: '../editInfo/editInfo'
    })
  }

})