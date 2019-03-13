// pages/login/login.js

import Toast from '../../dist/toast/toast';

const app = getApp()

Page({

  data: {
    // status
    authorization: false,
    openId: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    // input userInfo
    input: {
      name: '',
      phone: 123456,
      role: ''
    },

    // picker01
    show01: false,
    columns01: ['普通用户', '管理员']
  },

  // pages onLoad
  onLoad: function(options) {
    var that = this
    // 获取用户授权信息
    wx.getSetting({
      success: res => {
        console.log("授权信息：", res.authSetting)
        // 如果已经授权
        if (res.authSetting['scope.userInfo']) {
          app.globalData.authorization = true
          console.log("是否授权：", app.globalData.authorization)
          // 获取用户openId
          wx.login({
            success: res => {
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxd10cf7349d4d29d3&secret=b3cce29c050d603738df811d1f3dc8ab&js_code=' + res.code + '&grant_type=authorization_code',
                success: res => {
                  console.log("封装数据: ", res)
                  if (res.data.openid) {
                    app.globalData.openId = res.data.openid
                    console.log("用户标识", res)
                    that.setData({
                      authorization: app.globalData.authorization,
                      openId: app.globalData.openId,
                    })
                    // 如果已经注册，直接进行登陆
                    // 如果没有，进入信息填写界面
                    wx.request({
                      url: 'http://101.132.69.33:2333/user/getInfo/' + app.globalData.openId,
                      success: res => {
                        console.log("查询-用户：", res)
                        // 如果用户已经完成注册，设置已登陆标识
                        if (res.data) {
                          app.globalData.loginStatus = true
                          that.setData({
                            loginStatus: app.globalData.loginStatus
                          })
                          // 获取注册信息
                          app.globalData.userInfo.name = res.data.name
                          app.globalData.userInfo.phone = res.data.phone
                          app.globalData.userInfo.role = res.data.role
                          console.log("注册状态：", that.data.loginStatus)
                          console.log("用户信息：", app.globalData.openId, app.globalData.userInfo)
                          wx.getUserInfo({
                            success(res) {
                              console.log("获取信息：", res.userInfo)
                              // 储存用户头像
                              app.globalData.avatarUrl = res.userInfo.avatarUrl
                            }
                          })
                          // 自动跳转页面
                          wx.switchTab({
                            url: '../../pages/main/main',
                          })
                          console.log("自动进入")
                        } else {
                          console.log("No loginStatus")
                          wx.getUserInfo({
                            success(res) {
                              console.log("获取信息：", res.userInfo)
                              // 储存用户头像
                              app.globalData.avatarUrl = res.userInfo.avatarUrl
                            }
                          })
                        }
                      }
                    })
                  } else {
                    console.log("No authorization")
                  }
                }
              })
            }
          })
        }
      }
    })
  },

  // page functions

  // logIn
  logIn: function () {
    var that = this
    console.log("表单信息：", app.globalData.openId, that.data.input, app.globalData.avatarUrl)
    // 判断表单信息是否完善
    if (app.globalData.openId != '' && that.data.input.name != '' && that.data.input.phone != '' && that.data.input.role != '') {
      wx.request({
        // 获取openid，注册用户信息
        url: 'http://101.132.69.33:2333/user/addUser',
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          'name': that.data.input.name,
          'phone': parseInt(that.data.input.phone),
          'role': that.data.input.role,
          'wechatid': app.globalData.openId,
          'avatar': app.globalData.avatarUrl
        },
        success: res => {
          // 
          console.log("增添-用户：", res)
          // 注册完成之后
          app.globalData.loginStatus = true
          app.globalData.userInfo.name = that.data.input.name
          app.globalData.userInfo.phone = that.data.input.phone
          app.globalData.userInfo.role = that.data.input.role
          console.log("注册完成：", app.globalData.userInfo)
          Toast({
            duration: 1300,
            message: '注册成功！',
          });
          // 进入页面
          setTimeout(function () {
            wx.switchTab({
              url: '../../pages/main/main',
            })
          }, 1400);
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

  // onAuthorize
  onAuthorize: function(e) {
    console.log(e.detail.userInfo)
    // 直接重启即可
    wx.reLaunch({
      url: '../login/login',
    })
  },

  // onRole
  onRole: function() {
    if(this.data.input.role == ''){
      this.setData({
        'input.campus': this.data.columns01[0],
      })
    }
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
  onChange01: function (e) {
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
      'input.role': e.detail.value
    })
  },

  onChange04: function (e) {
    this.setData({
      'input.profile': e.detail
    })
  }
})