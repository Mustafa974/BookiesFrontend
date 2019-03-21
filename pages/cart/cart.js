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
    selectedBookList:[],

  },

  //load group list
  onLoad: function (options) {
    // this.initEleWidth();
    this.RefreshPage();
  },

  onShow:function(options) {
    this.RefreshPage();
  },

  onPullDownRefresh:function(e) {
    this.RefreshPage();
  },

  RefreshPage:function(e) {
    var that = this
    var wechaId = app.globalData.openId
    wx.request({
      url: 'http://101.132.69.33:8080/cart/get?page=0&wxId=' + wechaId,
      success: res => {
        if (res.statusCode == 200) {
          var info = res.data
          for (let i = 0; i < info.length; i++) {
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

  //勾选事件处理函数  
  switchSelect: function (e) {
    // 获取item项的id，和数组的下标值  
    var Allprice = 0, i = 0;
    let cartid = e.target.dataset.cartid,
    index = parseInt(e.target.dataset.index);
    var bklist = this.data.selectedBookList
    bklist.push(cartid)
    // console.log("selected book list:")
    // console.log(bklist)
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
      Allprice = Allprice + (this.data.booksInfo[i].price * this.data.booksInfo[i].discount * this.data.booksInfo[i].count);
    }
    // console.log("all price is " + Allprice + ", total money is " + this.data.totalMoney)
    if (Allprice == this.data.totalMoney) {
      // console.log("all selected")
      this.data.isAllSelect = true;
    }
    else {
      // console.log("not all selected")
      this.data.isAllSelect = false;
    }
    this.setData({
      booksInfo: this.data.booksInfo,
      totalMoney: this.data.totalMoney,
      totalCount: this.data.totalCount,
      isAllSelect: this.data.isAllSelect,
      selectedBookList: bklist
    })
  },

  //全选
  allSelect: function (e) {
    //处理全选逻辑
    let i = 0;
    if (!this.data.isAllSelect) {
      this.data.totalMoney = 0;
      this.data.selectedBookList = [];
      for (i = 0; i < this.data.booksInfo.length; i++) {
        this.data.booksInfo[i].isSelect = true;
        this.data.totalMoney += (this.data.booksInfo[i].price * this.data.booksInfo[i].discount * this.data.booksInfo[i].count);
        this.data.totalCount += this.data.booksInfo[i].count;
        this.data.selectedBookList.push(this.data.booksInfo[i].cartId);
      }
    }
    else {
      for (i = 0; i < this.data.booksInfo.length; i++) {
        this.data.booksInfo[i].isSelect = false;
      }
      this.data.totalMoney = 0;
      this.data.totalCount = 0;
      this.data.selectedBookList = [];
    }
    // console.log("all select button, selected book list:")
    // console.log(this.data.selectedBookList)
    this.setData({
      booksInfo: this.data.booksInfo,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney,
      totalCount: this.data.totalCount,
      selectedBookList: this.data.selectedBookList
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

  // save change of book count
  saveCountChange:function(e){
    var that = this
    console.log(that.data.booksInfo)
    wx.request({
      url: 'http://101.132.69.33:8080/cart/save',
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        'bookId': bookid,
        'count': count,
        'wxId': app.globalData.openId
      },
      success: res => {
        if (res.statusCode == 200) {
          var info = res.data
          console.log("成功更新购物车")
          that.setData({
            showDialog: false,
            'bookInfo.count': 1
          })
        }
        else {
          console.log("加入购物车失败，状态码为：" + res.statusCode)
        }
      }
    })
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
  deleteItem: function (e) {
    var that = this
    var wxId = app.globalData.openId
    var bookId = e.currentTarget.dataset.bookid
    console.log("要删除的书籍id为："+bookId)
    wx.request({
      url: 'http://101.132.69.33:8080/cart/delete?bookId=' + bookId + '&wxId=' + wxId,
      method: 'DELETE',
      data: {
        'bookId': bookId,
        'wxId': wxId
      },
      success: res => {
        if (res.statusCode == 200) {
          this.RefreshPage();
          // var info = res.data
          // for (let i = 0; i < info.length; i++) {
          //   info[i].txtStyle = ''
          //   info[i].isSelected = false
          // }
          // that.setData({
          //   booksInfo: info,
          // })
          console.log("删除书籍成功")
        }
        else {
          console.log("删除书籍失败")
        }
      }
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
    // console.log("selected book list:")
    // console.log(this.data.selectedBookList)
    if(this.data.selectedBookList.length==0){
      console.log("没有选择商品进行结算！")
      wx.showToast({
        title: '请选择商品！',
        icon: 'none',
        duration: 3000
      });
    }
    else {
      this.priceCount();
      console.log("url: ../orderDetail/orderDetail?cartidList=" + this.data.selectedBookList)
      // wx.showToast({
      //   title: '进行结算',
      //   icon: 'success',
      //   duration: 1500
      // });
      wx.navigateTo({
        url: '../orderDetail/orderDetail?cartidList=' + this.data.selectedBookList
      })
    }
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