// pages/editInfo/editInfo.js

import Toast from '../../dist/toast/toast';

const app = getApp()

Page({
  data: {
    // input userInfo
    input: {},

    // picker01
    show01: false,
    columns01: ['嘉定校区', '四平校区']
  },

  // when pages loads
  onShow: function() {
    var that = this
    // 获取用户信息
    if (app.globalData.loginStatus) {
      that.setData({
        input: app.globalData.userInfo
      })
      console.log("用户信息：", that.data.input)
    }
  },

  // page functions

  // modify info
  changeInfo: function(e) {
    console.log("获取的事件信息：", e)
    var that = this
    console.log("表单信息：", app.globalData.openId, that.data.input)
    // 判断表单信息是否完善
    if (app.globalData.openId != '' && that.data.input.name != '' && that.data.input.phone != '') {
      wx.request({
        // 获取openid，注册用户信息
        url: 'http://101.132.69.33:2333/user/changeInfo/',
        method: 'PUT',
        data: {
          'avatar': app.globalData.avatarUrl,
          'name': that.data.input.name,
          'phone': that.data.input.phone,
          'wechatid': app.globalData.openId
        },
        success: res => {
          console.log("修改-用户：", res)
          // 修改完成之后，提示修改成功并刷新全局数据
          Toast({
            duration: 1300,
            message: '修改成功！',
          });
          // 刷新数据
          wx.request({
            url: 'http://101.132.69.33:2333/user/getInfo/' + app.globalData.openId,
            success: res => {
              console.log("查询-用户：", res)
              app.globalData.userInfo.name = res.data.name
              app.globalData.userInfo.phone = res.data.phone
              console.log("当前信息：", app.globalData.userInfo, app.globalData.avatarUrl);
            }
          });
        }
      })
    } else {
      Toast({
        duration: 1300,
        message: '请完善信息哦',
      });
      console.log("信息不完善")
    }
  },

  // onCampus
  onCampus: function() {
    this.setData({
      show01: true
    })
  },

  // onCancel
  onCancel: function() {
    this.setData({
      show01: false
    })
  },

  // onChanges
  onChange01: function(e) {
    this.setData({
      'input.name': e.detail
    })
  },

  onChange02: function(e) {
    this.setData({
      'input.phone': e.detail
    })
  }
  
})