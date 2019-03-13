// pages/activities/activity.js 
import Toast from '../../dist/toast/toast';

const app = getApp()
const buttons = [{
    label: '查看帮助',
    icon: '../../assets/icons/file-text.png',
  },
  {
    label: '联系卖家',
    icon: '../../assets/icons/message-square.png',
  }
];


Page({

  /**
   * Page initial data
   */
  data: {
    //publish
    buttons,

    // BookInfo
    bookInfo: {
      bookImg: "../../assets/images/img/img_kite.png",
      bookId: 1,
      bookTitle: "追风筝的人",
      bookPrice: "￥20.48",
      bookDiscount: "70%",
      bookCount: 1
    },

  },

  //load group list
  onLoad: function (options) {
    var that = this
    var wechaId = app.globalData.openId
    wx.request({
      url: 'http://101.132.69.33:2333/getGroupCircleList/getGCListByTime/' + wechaId,
      success: res => {
        var info = res.data
        that.setData({
          cardInfo: info
        })
        console.log(that.data.cardInfo)
      }
    })
  },

  //add-icon: Publish
  onClick(e) {
    console.log('onClick', e.detail)
    if (e.detail.index === 1) {
      wx.switchTab({
        url: '../../pages/main/main'
      })
    }
    if (e.detail.index === 0) {
      wx.switchTab({
        url: '../../pages/mine/mine'
      })
    }
  },

  // toPages
  toPage: function (e) {
    var bookid = event.currentTarget.dataset.bid
    var index = event.currentTarget.dataset.index
    console.log(bookid + ' and ' + index)
    wx.navigateTo({
      url: '../mainCard/mainCard?bookid=' + bookid + '&index=' + index
    })
  },

})