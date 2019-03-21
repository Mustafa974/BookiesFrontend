// pages/login/login.js
// + app.globalData.openId,
const app = getApp()
const util = require('../../utils/util.js')

Page({

  data: {
    // status
    authorization: false,
    openId: [],
    loginStatus: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    // input userInfo
    input: {
      name: '',
      phone: '',
      birthday: '',
      province: '',
      address:'',
    },

    // picker01
    show01: false,
    show02: false,
    startDate: '1940-01-01',
    endDate: '2019-03-15',
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
          // console.log("是否授权：", app.globalData.authorization)
          // 获取用户openId
          wx.login({
            success: res => {
              console.log(res)
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxffea6242979693fc&secret=7996c703934f284aefe101d0d5d06737&js_code=' + res.code + '&grant_type=authorization_code',
                success: res => {
                  console.log("请求结果", res)
                  if (res.data.openid) {
                    app.globalData.openId = res.data.openid
                    console.log("用户标识", res.data.openid)
                    that.setData({
                      authorization: app.globalData.authorization,
                      openId: app.globalData.openId,
                    })
                    // 如果已经注册，直接进行登陆
                    // 如果没有，进入信息填写界面
                    that.GetUserInfo()
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

  // get user info
  GetUserInfo:function(e){
    var that = this
    wx.request({
      url: 'http://101.132.69.33:8080/user/get?wxId=' + app.globalData.openId,
      success: res => {
        if (res.statusCode == 200) {
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
            var birth = res.data.birthday
            birth = birth.substring(0, 10)
            // console.log(birth)
            app.globalData.userInfo.birthday = birth
            var tmp_prov, new_prov
            tmp_prov = res.data.province + ',' + res.data.city + ',' + res.data.district
            new_prov = tmp_prov.split(",")
            app.globalData.userInfo.province = new_prov
            app.globalData.userInfo.address = res.data.address
            console.log("注册状态：", that.data.loginStatus)
            console.log("用户信息：", app.globalData.userInfo)
            wx.getUserInfo({
              success(res) {
                console.log("获取用户头像信息")
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
        else {
          console.log("获取用户信息请求失败！错误状态码：" + res.statusCode)
        }
      }
    })
  },

  // SignUp
  SignUp: function () {
    var that = this
    console.log("表单信息：", app.globalData.openId, that.data.input, app.globalData.avatarUrl)
    // 判断表单信息是否完善
    if (app.globalData.openId != '' && that.data.input.name != '' && that.data.input.phone != '' && that.data.input.birthday != '' && that.data.input.province != '' && that.data.input.address != '') {
      console.log(app.globalData.openId)
      console.log(that.data.input.name)
      console.log(that.data.input.phone)
      console.log(that.data.input.birthday)
      console.log(that.data.input.province)
      console.log(that.data.input.address)
      var new_add = that.data.input.province.join(',')+','+that.data.input.address
      new_add = new_add.split(',')
      console.log(new_add)
      wx.request({
        // 获取openid，注册用户信息
        url: 'http://101.132.69.33:8080/user/create',
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          'name': that.data.input.name,
          'phone': parseInt(that.data.input.phone),
          'birthday': that.data.input.birthday,
          'address':new_add,
          'wxId': app.globalData.openId
        },
        success: res => {
          if(res.statusCode==200){
            console.log("增添-用户：", res)
            // 注册完成之后
            app.globalData.loginStatus = true
            app.globalData.userInfo.name = that.data.input.name
            app.globalData.userInfo.phone = that.data.input.phone
            app.globalData.userInfo.birthday = that.data.input.birthday
            app.globalData.userInfo.province = that.data.input.province
            app.globalData.userInfo.address = that.data.input.address
            console.log("注册完成：", app.globalData.userInfo)
            wx.showToast({
              title: '注册成功！',
              icon: 'success',
              duration: 1300
            });
            // 进入页面
            setTimeout(function () {
              wx.switchTab({
                url: '../../pages/main/main',
              })
            }, 1400);
          }
          else {
            console.log("注册用户请求失败！错误状态码：" + res.statusCode)
          }
        }
      })
    } else {
      wx.showToast({
        title: '请完善信息哦',
        duration: 1300
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
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      wx.request({
        url: app.globalData.urlPath + 'user/add',
        data: {
          openid: getApp().globalData.openid,
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
          province: e.detail.userInfo.province,
          city: e.detail.userInfo.city
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //从数据库获取用户信息
          that.queryUsreInfo();
          console.log("插入小程序登录用户信息成功！");
        }
      });
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },

  // on click birthday
  onClickBirth: function (e) {
    this.setData({
      show01: true
    })
  },

  // on click province
  onClickProvince: function (e) {
    this.setData({
      show02: true
    })
  },

  // onCancel
  onCancel: function () {
    this.setData({
      show01: false,
      show02: false,
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
      'input.birthday': e.detail.value
    })
    console.log(this.data.input.birthday)
  },

  onChange04: function (e) {
    this.setData({
      'input.province': e.detail.value
    })
    console.log(this.data.input.province)
  },

  onChange05: function (e) {
    this.setData({
      'input.address': e.detail
    })
  },

})