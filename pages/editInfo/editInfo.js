// pages/editInfo/editInfo.js

const app = getApp()

Page({
  data: {
    // input userInfo
    input: {},

    // picker01
    show01: false,
    startDate: '1940-01-01',
    endDate: '2019-03-15',

    //picker02
    show02: false,

  },

  // when pages loads
  onShow: function() {
    var that = this
    that.setData({
      input: app.globalData.userInfo
    })
    // 获取用户信息
    // if (app.globalData.loginStatus) {
    //   that.setData({
    //     input: app.globalData.userInfo
    //   })
    //   console.log("用户信息：", that.data.input)
    // }
  },

  // page functions

  // modify info
  changeInfo: function(e) {
    console.log("获取的事件信息：", e)
    var that = this
    console.log("表单信息：", app.globalData.openId, that.data.input)
    // 判断表单信息是否完善
    if (app.globalData.openId != '' && that.data.input.name != '' && that.data.input.phone != '' && that.data.input.birthday != '' && that.data.input.province != '') {
      wx.showToast({
        title: '修改信息成功',
        icon: 'success',
        duration: 2000
      });
      wx.request({
        // 获取openid，注册用户信息
        url: 'http://101.132.69.33:2333/user/changeInfo/',
        method: 'PUT',
        data: {
          'avatar': app.globalData.avatarUrl,
          'name': that.data.input.name,
          'phone': that.data.input.phone,
          'wechatid': app.globalData.openId,
          'birthday': that.data.input.birthday,
          'province': that.data.input.province,
        },
        success: res => {
          console.log("修改-用户：", res)
          // 修改完成之后，提示修改成功并刷新全局数据
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1300
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
      wx.showToast({
        title: '请完善信息哦',
        icon: 'cancel',
        duration: 1300
      });
      console.log("信息不完善")
    }
  },

  // on click birthday
  onClickBirth: function (e) {
    this.setData({
      show01: true
    })
  },

  // on click province
  onClickProvince: function(e) {
    this.setData({
      show02: true
    })
  },

  // onCancel
  onCancel: function() {
    this.setData({
      show01: false,
      show02: false,
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
  },

  onChange03: function (e) {
    this.setData({
      'input.birthday': e.detail.value
    })
    console.log(this.data.input.birthday)
  },

  onChange04: function(e) {
    this.setData({
      'input.province': e.detail.value
    })
    console.log(this.data.input.province)
  }
  
})