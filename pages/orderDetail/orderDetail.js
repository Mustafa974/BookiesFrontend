// pages/orderDetail/orderDetail.js
const app = getApp()

Page({

  data: {
    cartidList: [],
    cartInfoList: [],
    totalCount: 0,
    totalPrice: 0,
    receiverInfo: {},
    show: false,
    showConfirm: false,
    orderId: 0,
  },

  //load group list
  onLoad: function (detail) {
    var that = this
    var list = detail.cartidList.split(',')
    that.setData({
      cartidList: list,
      totalCount: 0,
      totalPrice: 0,
      receiverInfo: app.globalData.userInfo,
    })
    // get all of the cart info and save to data
    for(var i = 0; i < that.data.cartidList.length; i++){
      that.loadCartInfo(that.data.cartidList[i])
    }
    console.log(that.data.cartidList)
  },

  // get cart detail info
  loadCartInfo:function(detail){
    var that = this
    var wechaId = app.globalData.openId
    wx.request({
      url: 'http://101.132.69.33:8080/cart/getById?cartId='+detail,
      success: res => {
        if (res.statusCode == 200) {
          var info = res.data
          var c = that.data.totalCount
          var p = that.data.totalPrice
          c += info.count
          p += info.bookId.price * info.bookId.discount * info.count
          var list = that.data.cartInfoList
          list.push(info)
          that.setData({
            cartInfoList: list,
            totalCount: c,
            totalPrice: p,
          })
          // console.log(that.data.cartInfoList)
        }
        else {
          console.log("获取购物车条目失败")
        }
      }
    })
  },

  // on click province
  onClickProvince: function (e) {
    var that = this
    that.setData({
      show: true,
    })
  },

  // onCancel
  onCancel: function () {
    var that = this
    that.setData({
      show: false,
    })
  },

  // onChanges
  onChange01: function (e) {
    this.setData({
      'receiverInfo.name': e.detail
    })
  },

  onChange02: function (e) {
    this.setData({
      'receiverInfo.phone': e.detail
    })
  },

  onChange03: function (e) {
    this.setData({
      'receiverInfo.province': e.detail.value
    })
  },

  onChange04: function (e) {
    this.setData({
      'receiverInfo.address': e.detail
    })
  },

  onCancelPay:function(){
    var that = this
    that.setData({
      showConfirm: false,
    })
    wx.switchTab({
      url: '/pages/history/history',
    })
  },

  onConfirm:function(e) {
    var that = this
    var wechaId = app.globalData.openId
    // 判断表单信息是否完善
    if (app.globalData.openId != '' && that.data.cartidList != [] && that.data.receiverInfo.phone != '' && that.data.receiverInfo.name != '' && that.data.receiverInfo.province != '' && that.data.receiverInfo.address != '') {
      console.log(app.globalData.openId)
      console.log(that.data.receiverInfo.name)
      console.log(that.data.receiverInfo.phone)
      console.log(that.data.receiverInfo.province)
      console.log(that.data.receiverInfo.address)
      var new_add = that.data.receiverInfo.province.join(',') + ',' + that.data.receiverInfo.address
      new_add = new_add.split(',')
      console.log(new_add)
      wx.request({
        url: 'http://101.132.69.33:8080/order/create',
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          'cartList': that.data.cartidList,
          'wxId': app.globalData.openId,
          'receiverName': that.data.receiverInfo.name,
          'receiverPhone': that.data.receiverInfo.phone,
          'receiverAddress': new_add,
        },
        success: res => {
          if (res.statusCode == 200) {
            var info = res.data
            console.log(info)
            this.setData({
              showConfirm: true,
              orderId: res.data.id,
            })
          }
          else {
            wx.showToast({
              title: '生成订单失败！',
              icon: 'none',
              duration: 1300
            });
            console.log("生成订单失败")
          }
        }
      })
    } else {
      wx.showToast({
        title: '请完善信息哦',
        icon: 'loading',
        duration: 1300
      });
      console.log("信息不完善")
    }
  },

  //pay
  onPay: function (e) {
    var that = this
    that.setData({
      showConfirm: false,
    })
    wx.request({
      url: 'http://101.132.69.33:8080/order/pay?orderId='+that.data.orderId,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
      },
      success: res => {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                wx.switchTab({ url: '/pages/history/history' })   
              }, 1000);
            }
          })
        }
        else {
          wx.showToast({
            title: '支付失败！',
            icon: 'none',
            duration: 1300
          });
          console.log("支付失败")
        }
      }
    })
  },

})
