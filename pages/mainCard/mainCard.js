// pages/mainCard/mainCard.js

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    bookInfo: {},
    showDialog: false,
    totalMoney: 0,
  },

  onLoad: function (detail) {
    console.log("书籍详情页")
    console.log(detail)
    var that = this
    that.setData({
      bookInfo: app.globalData.booksInfo[detail.bookid],
    })
    // wx.request({
    //   url: 'http://101.132.69.33:2333/viewInfo/getDetailed/' + detail.bookid,
    //   success(res) {
    //     var info = res.data
    //     that.setData({
    //       title: info.title,
    //       author: info.author,
    //       price: info.price,
    //       isbn: info.isbn,
    //       imgSrc: info.imgSrc,
    //       publisher: info.publisher,
    //       discription: info.discription,
    //       discount: info.discount
    //     })
    //     // console.log(info)
    //     console.log(that.data)
    //   }
    // })
  },

  // 弹出/取消弹出sku加入购物车页面
  toggleDialog: function () {
    this.setData({
      showDialog: !this.data.showDialog
    });
    this.priceCount();
  },

  /* 加数 */
  addCount: function (e) {
    console.log("刚刚您点击了加一");
    var count = this.data.bookInfo.count;
    // 商品总数量-1  
    if (count < 20) {
      count += 1;
    }
    // 将数值与状态写回  
    this.setData({
      'bookInfo.count': count
    });
    this.priceCount();
  },
  
  /* 减数 */
  delCount: function (e) {
    console.log("刚刚您点击了减一");
    var count = this.data.bookInfo.count;
    // 商品总数量-1
    if (count > 1) {
      count -= 1;
    }
    // 将数值与状态写回  
    this.setData({
      'bookInfo.count': count
    });
    this.priceCount();
  },

  // 加入购物车
  addToCart: function (e) {
    var bookid = e.target.dataset.bookid;
    var count = e.target.dataset.count;
    var wechatid = app.globalData.openId;
    console.log("成功加入购物车");
    console.log(bookid);
    console.log(count);
    wx.showToast({
      title: '成功加入购物车',
      icon: 'success',
      duration: 2000
    });
    console.info("成功加入购物车，关闭弹框");
    this.setData({
      showDialog: false
    });
    this.priceCount();
  },

  // 计算总价
  priceCount: function (e) {
    this.data.totalMoney = 0;
    this.data.totalMoney = this.data.totalMoney + (this.data.bookInfo.price * this.data.bookInfo.discount * this.data.bookInfo.count);
    this.setData({
      totalMoney: this.data.totalMoney,
    })
    console.log("total price:" + this.data.totalMoney);
  },

})