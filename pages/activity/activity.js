// pages/activities/activity.js 
import Toast from '../../dist/toast/toast';

const app = getApp()
const buttons = [{
    label: '查看帮助',
    icon: '../../assets/icons/file-text.png',
  },
  {
    label: '我的参团和收藏',
    icon: '../../assets/icons/message-square.png',
  },
  {
    label: '发布活动',
    icon: '../../assets/icons/edit.png',
  },
];


Page({

  /**
   * Page initial data
   */
  data: {
    //publish
    buttons,

    // select01
    selectOrder: '排序方式 ▼',
    show01: 0,
    index01: 0,
    columns01: ['时间最近', '即将满员', '智能推荐'],

    // select02
    selectChoise: '筛选 ▼',
    show02: 0,
    index02: 0,
    columns02: [],

    // CardInfo
    cardInfo: {
      pubImg: "../../assets/images/user.jpg",
      groupId: 1,
      cardTitle: "嘉园杯羽毛球",
      cardPlace: "嘉定校区",
      cardVenue: "体育中心",
      cardSport: "羽毛球",
      cardStartTime: "08:00",
      cardNum: 4,
      cardSum: 8,
      //is collected
      collected: 0,
      //stateGroup
      state: 0,
      pubTime: "18-12-25",
    },


  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    // this.loadData()
  },

  // 用户id：app.globalData.openId

  //load group list
  loadDataByTime: function() {
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
  loadDataByMem: function() {
    var that = this
    wx.request({
      url: 'http://101.132.69.33:2333/getGroupCircleList/getGCListByMem/' + app.globalData.openId,
      success: res => {
        var info = res.data
        that.setData({
          cardInfo: info
        })
      }
    })
  },
  loadDataByTag: function() {
    var that=this
    wx.request({
      url: 'http://101.132.69.33:2333/getGroupCircleList/getGCListByTag/' + app.globalData.openId,
      success: res => {
        var info = res.data
        that.setData({
          cardInfo: info
        })
        console.log(info)
      }
    })
  },

  // onShow
  onShow: function() {
    var selected = this.data.selectOrder
    // console.log('selected:'+selected)
    if (selected == '排序方式 ▼' || selected =='时间最近 ▼') {
      this.loadDataByTime()
      // console.log(selected == '排序方式 ▼' || '时间最近 ▼')
    } else if (selected == '即将满员 ▼') {
      this.loadDataByMem()
      // console.log(selected == '即将满员 ▼')
    } else {
      this.loadDataByTag()
      // console.log(selected == '只能排序')
    }
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },

  // select01
  onClick01() {
    this.setData({
      show01: true
    });
  },

  onConfirm01(event) {
    var that = this
    const {
      picker,
      value,
      index
    } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      show01: false,
      selectOrder: this.data.columns01[index] + " ▼",
    })
    // console.log(event.detail)
    if (index == 0) {
      that.loadDataByTime()
    } else if (index == 1) {
      that.loadDataByMem()
    } else {
      that.loadDataByTag()
      console.log('智能排序')
      
    }
  },

  // select02
  onClick02() {
    this.setData({
      show02: true
    });
  },

  //select02-change
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    picker.setColumnValues(1, Object.keys(app.globalData.places[value[0]]));
    picker.setColumnValues(2, app.globalData.places[value[0]][value[1]]);
  },

  //select02-confirm
  onConfirm02(event) {
    var that = this
    const {
      picker,
      value,
      index
    } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      show02: false,
      // selectOrder: this.data.columns02[index] + " ▼",
      // 
    })
    wx.request({
      url: 'http://101.132.69.33:2333/getGroupCircleList/getGCListBySport/' + app.globalData.openId + '/' + value[0] + '/' + value[1] + '/' + value[2],
      success: res => {
        var info = res.data
        that.setData({
          cardInfo: info
        })
      }
    })
  },

  onCancel0102() {
    this.setData({
      show02: false,
      show01: false
    });
  },

  //add-icon: Publish
  onClick(e) {
    // console.log('onClick', e.detail)
    if (e.detail.index === 2) {
      wx.navigateTo({
        url: '../../pages/publishCard/publishCard'
      })
    }
    if (e.detail.index === 1) {
      wx.switchTab({
        url: '../../pages/myGroup/myGroup'
      })
    }
    if (e.detail.index === 0) {
      wx.switchTab({
        url: '../../pages/main/main'
      })
    }
  },
  // onChange(e) {
  //   console.log('onChange', e)
  // },

  // toPages
  toPage: function(e) {
    var groupId = e.currentTarget.dataset.groupid
    console.log(e.detail);
    wx.navigateTo({
      url: '../activityCard/activityCard?groupId=' + groupId,
    })
  },

})