// pages/cart/cart.js 
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    // hidden: null,
    isAllSelect: false,
    totalMoney: 0,
    totalCount: 0,
    // 删除按钮的宽度
    delBtnWidth: 150,
    startX: 0,

    booksInfo: [],
    selectedBooks:[],

  },

  //load group list
  onLoad: function (options) {
    // this.initEleWidth();
    var that = this
    var wechaId = app.globalData.openId
    wx.request({
      url: 'http://101.132.69.33:8080/cart/get?page=0&wxId=' + wechaId,
      success: res => {
        if(res.statusCode==200){
          var info = res.data
          for(let i=0; i<info.length; i++){
            info[i].txtStyle = ''
            info[i].isSelected = false
          }
          that.setData({
            booksInfo: info,
          })
          console.log(that.data.booksInfo)
        }
      }
    })
  },

  onShow:function(options) {
    // let pages = getCurrentPages();
    // let prevpage = pages[pages.length - 2];
    // console.log("打印当前页面")
    // console.log(pages)
    // console.log("打印前一个页面的信息")
    // console.log(prevpage)
  },

  //勾选事件处理函数  
  switchSelect: function (e) {
    // 获取item项的id，和数组的下标值  
    var Allprice = 0, i = 0;
    let id = e.target.dataset.id,
    index = parseInt(e.target.dataset.index);
    this.data.booksInfo[index].isSelect = !this.data.booksInfo[index].isSelect;
    //价钱统计
    if (this.data.booksInfo[index].isSelect) {
      this.data.totalMoney = this.data.totalMoney + (this.data.booksInfo[index].price * this.data.booksInfo[index].discount * this.data.booksInfo[index].count);
      this.data.totalCount = this.data.totalCount + this.data.booksInfo[index].count;
    }
    else {
      this.data.totalMoney = this.data.totalMoney - (this.data.booksInfo[index].price * this.data.booksInfo[index].discount * this.data.booksInfo[index].count);
      this.data.totalCount = this.data.totalCount - this.data.booksInfo[index].count;
    }
    //是否全选判断
    for (i = 0; i < this.data.booksInfo.length; i++) {
      Allprice = Allprice + (this.data.booksInfo[index].price * this.data.booksInfo[index].discount * this.data.booksInfo[index].count);
    }
    if (Allprice == this.data.totalMoney) {
      this.data.isAllSelect = true;
    }
    else {
      this.data.isAllSelect = false;
    }
    this.setData({
      booksInfo: this.data.booksInfo,
      totalMoney: this.data.totalMoney,
      totalCount: this.data.totalCount,
      isAllSelect: this.data.isAllSelect,
    })
  },

  //全选
  allSelect: function (e) {
    //处理全选逻辑
    let i = 0;
    if (!this.data.isAllSelect) {
      this.data.totalMoney = 0;
      for (i = 0; i < this.data.booksInfo.length; i++) {
        this.data.booksInfo[i].isSelect = true;
        this.data.totalMoney += (this.data.booksInfo[i].price * this.data.booksInfo[i].discount * this.data.booksInfo[i].count);
        this.data.totalCount += this.data.booksInfo[i].count;
      }
    }
    else {
      for (i = 0; i < this.data.booksInfo.length; i++) {
        this.data.booksInfo[i].isSelect = false;
      }
      this.data.totalMoney = 0;
      this.data.totalCount = 0;
    }
    this.setData({
      booksInfo: this.data.booksInfo,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney,
      totalCount: this.data.totalCount,
    })
  },

  /* 减数 */
  delCount: function (e) {
    var index = e.target.dataset.index;
    console.log("刚刚您点击了减-");
    var count = this.data.booksInfo[index].count;
    // 商品总数量-1
    if (count > 1) {
      this.data.booksInfo[index].count--;
    }
    // 将数值与状态写回  
    this.setData({
      booksInfo: this.data.booksInfo,
    });
    // console.log("booksInfo:" + this.data.booksInfo);
    this.priceCount();
  },

  /* 加数 */
  addCount: function (e) {
    var index = e.target.dataset.index;
    console.log("刚刚您点击了加+");
    var count = this.data.booksInfo[index].count;
    // 商品总数量+1  
    if (count < 20) {
      this.data.booksInfo[index].count++;
    }
    // 将数值与状态写回  
    this.setData({
      booksInfo: this.data.booksInfo,
    });
    // console.log("booksInfo:" + this.data.booksInfo);
    this.priceCount();
  },

  // calculate total price
  priceCount: function (e) {
    this.data.totalMoney = 0;
    this.data.totalCount = 0;
    var list = [];
    for (var i = 0; i < this.data.booksInfo.length; i++) {
      if (this.data.booksInfo[i].isSelect == true) {
        this.data.totalMoney = this.data.totalMoney + (this.data.booksInfo[i].price * this.data.booksInfo[i].discount * this.data.booksInfo[i].count);
        this.data.totalCount = this.data.totalCount + this.data.booksInfo[i].count;
        list.push({ 'bookid': this.data.booksInfo[i].id, 'count': this.data.booksInfo[i].count});
      }
    }
    this.setData({
      totalMoney: this.data.totalMoney,
      totalCount: this.data.totalCount,
      selectedBooks: list,
    })
    console.log("total price:" + this.data.totalMoney);
    // console.log("selected books:");
    // console.log(this.data.selectedBooks);
  },

  // 左滑删除相关函数
  touchStart: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
      // console.log("触摸开始--触摸起始点位置为：");
      // console.log(this.data.startX);
    }
  },

  touchMove: function (e) {
    // console.log("触摸移动");
    if (e.touches.length == 1) {
      var that = this;
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      // console.log("当前下标为"+index)
      // console.log(txtStyle);
      var list = that.data.booksInfo;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        booksInfo: list,
        delBtnWidth: delBtnWidth,
      });
    }
  },

  touchEnd: function (e) {
    // console.log("触摸结束");
    var that = this;
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      // console.log("当前下标为"+index);
      // console.log(txtStyle);
      var list = that.data.booksInfo;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        booksInfo: list,
        delBtnWidth: delBtnWidth,
      });
    }
  },

  // 删除购物车
  deleteItem: function(e){
    var index = e.currentTarget.dataset.index
    // console.log("要删除的对象下标为："+index)
    var list = this.data.booksInfo
    list.splice(index,1)
    // console.log("删除完的列表为：")
    // console.log(list)
    this.setData({
      booksInfo: list
    })
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000
    });
  },

  // 结算
  toBuy() {
    console.log("进行结算");
    this.priceCount();
    wx.showToast({
      title: '结算成功',
      icon: 'success',
      duration: 3000
    });
  },

  // toPages
  toPage: function (e) {
    var bookid = e.currentTarget.dataset.bookid
    console.log(bookid)
    wx.navigateTo({
      url: '../mainCard/mainCard?bookid=' + bookid
    })
  },

})