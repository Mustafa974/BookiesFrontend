// pages/history/history.js 
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    // orders info
    ordersInfo: [],
    // order list of different status
    orderList0: [],
    orderList1: [],

    orderId: 0,
    show01: false,
    show02: false,
  },

  //load group list
  onShow:function(e){
    this.setData({
      ordersInfo: app.globalData.application1,
      orderList0: app.globalData.application2,
      orderList1: app.globalData.application3,
    })
  },

  //pass application
  passApplication:function(e){
    var that = this
    var id = e.target.dataset.id
    var type = e.target.dataset.type
    // 获取要删除数据的id 
    console.log(id)
    console.log(type)
    wx.showModal({
      title: '提示',
      content: '是否确认通过该申请？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '通过申请成功',
            icon: 'success',
            duration: 1300
          });
          var list = []
          var index = 0
          // 删除数组对应的数据内容 
          if(type==0){
            list = that.data.ordersInfo
            for(var i = 0; i < list.length; i++){
              if(list[i]==id){
                index = i
                break
              }
            }
            list.splice(index, 1)
            console.log(list)
            that.setData({
              ordersInfo: list
            })
            that.onShow()
          }
          else if (type == 1) {
            list = that.data.orderList0
            for (var i = 0; i < list.length; i++) {
              if (list[i] == id) {
                index = i
                break
              }
            }
            list.splice(index, 1)
            console.log(list)
            that.setData({
              orderList0: list
            })
            that.onShow()
          }
          else if (type == 2) {
            list = that.data.orderList1
            for (var i = 0; i < list.length; i++) {
              if (list[i] == id) {
                index = i
                break
              }
            }
            list.splice(index, 1)
            console.log(list)
            that.setData({
              orderList1: list
            })
            that.onShow()
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
  },

  // toPages
  // toPage: function (e) {
  //   var bookid = e.currentTarget.dataset.bookid
  //   console.log(bookid)
  //   wx.navigateTo({
  //     url: '../mainCard/mainCard?bookid=' + bookid
  //   })
  // },

})