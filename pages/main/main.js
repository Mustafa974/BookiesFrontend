// pages/main/main.js

//获取应用实例
const app = getApp()

Page({
  // initial datas
  data: {

    // select
    selectOrder: '筛选方式 ▼',
    show: 0,
    index: 0,

    // books info
    groupInfo:[],
    groups:[],

  },

  //  pages functions
  onShow: function(options) {
    var that = this
    that.setData({
      groupInfo: app.globalData.groupInfo,
      groups: app.globalData.groups
    })
    console.log(app.globalData.groupInfo)
    console.log(app.globalData.groups)
  },

  // wxml functions end
})