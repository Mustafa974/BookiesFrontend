// pages/mainCard/mainCard.js

const app = getApp();

Page({

  data: {
    bookInfo: {
      id: 0,
      name: '',
      isbn: '',
      coverUrl: '',
      price: 0,
      discount: 1.0,
      stock: 0,
      author: '',
      publisher: '',
      description: '',
      sales: 0,
      category: '',
      count:0,
    },
    showDialog: false,
    totalMoney: 0,
    isIpX:false,
  },

  onLoad: function (detail) {
    console.log("书籍详情页，bookid="+detail.bookid)
    var that = this
    var bookList = app.globalData.booksInfo
    // console.log(bookList)
    var length = bookList.length
    var i = 0
    for (i = 0; i <= length; i++) {
      // console.log(bookList[i].id)
      if(bookList[i].id==detail.bookid){
        that.setData({
          'bookInfo.id': bookList[i].id,
          'bookInfo.name': bookList[i].name,
          'bookInfo.isbn': bookList[i].isbn,
          'bookInfo.coverUrl': bookList[i].coverUrl,
          'bookInfo.price': bookList[i].price,
          'bookInfo.discount': bookList[i].discount,
          'bookInfo.stock': bookList[i].stock,
          'bookInfo.author': bookList[i].author,
          'bookInfo.publisher': bookList[i].publisher,
          'bookInfo.description': bookList[i].description,
          'bookInfo.sales': bookList[i].sales,
          'bookInfo.category': bookList[i].category,
          'bookInfo.count': 1
        })
        console.log("找到对应书籍，书籍详情为")
        console.log(bookList[i])
        break
      }
    }
    if(i==length){
      console.log("找不到对应书籍")
      wx.showToast({
        title: '对不起，您选择的书籍不存在！',
        duration: 2000
      });
    }
    that.setData({
      isIpX:false
    });
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        if (res.model == 'iPhone X') {
          // console.log("is iphoneX")
          app.globalData.isIpX=true;
          that.setData({
            isIpX: true
          });
        }
      }
    })
  },

  // 弹出/取消弹出sku加入购物车页面
  toggleDialog: function () {
    this.setData({
      showDialog: !this.data.showDialog,
      'bookInfo.count': 1
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
    console.log(bookid);
    console.log(count);
    var that = this
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
          console.log("成功加入购物车")
          that.setData({
            showDialog: false,
            'bookInfo.count': 1
          })
          wx.showToast({
            title: '成功加入购物车',
            icon: 'success',
            duration: 2000
          });
          this.priceCount();
        }
        else {
          console.log("加入购物车失败，状态码为：" + res.statusCode)
        }
      }
    })
  },

  // 跳转购物车
  onClickCart: function () {
    wx.switchTab({
      url: '../cart/cart',
    })
  },

  // 计算总价
  priceCount: function (e) {
    this.data.totalMoney = 0;
    this.data.totalMoney = this.data.totalMoney + (this.data.bookInfo.price * this.data.bookInfo.discount * this.data.bookInfo.count);
    this.setData({
      totalMoney: this.data.totalMoney,
    })
    // console.log("total price:" + this.data.totalMoney);
  },

})