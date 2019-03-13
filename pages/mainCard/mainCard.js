// pages/mainCard/mainCard.js

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    bookID: 123,
    index: 0,
    title: '',
    author: '',
    price: '',
    isbn: '',
    imgSrc: '',
    publisher: '',
    discription: '',
    discount: '80%'
  },

  onLoad: function (detail) {
    console.log(detail)
    var that = this
    that.setData({
      bookID: detail.bookid,
      index: detail.index
    })
    that.setData({
      title: app.globalData.booksInfo[detail.index].title,
      author: app.globalData.booksInfo[detail.index].author,
      price: app.globalData.booksInfo[detail.index].price,
      isbn: app.globalData.booksInfo[detail.index].isbn,
      imgSrc: app.globalData.booksInfo[detail.index].imgSrc,
      publisher: app.globalData.booksInfo[detail.index].publisher,
      discription: app.globalData.booksInfo[detail.index].discription,
      discount: app.globalData.booksInfo[detail.index].discount
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

})