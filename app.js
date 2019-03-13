// app.js

App({
  globalData: {
    
    // fundamental datas
    authorization: false,
    openId: '',//wechat id
    avatarUrl: '../../assets/images/avatar_default.png',
    loginStatus: false,

    // user datas
    userInfo: {
      'name': '姓名',
      'phone': '123456',
      'role': 0
    },

    booksInfo: [
      {
        id: 111,
        title: "追风筝的人",
        author: "卡勒德·胡塞尼",
        price: "￥20.48",
        isbn: "9787208061644",
        imgSrc: "/assets/images/img/img_kite.png",
        publisher: "上海人民出版社",
        discription: "然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑。",
        discount: "70%"
      },
      {
        id: 222,
        title: "活着",
        author: "余华",
        price: "￥23.00",
        isbn: "9787506365437",
        imgSrc: "/assets/images/img/img_live.png",
        publisher: "作家出版社",
        discription: "《活着》是一部充满血泪的小说。余华通过一位中国农民的苦难生活 讲述了人如何去承受巨大的苦难；讲述了眼泪的丰富和宽广。",
        discount: "90%"
      }, 
      {
        id: 333,
        title: "罗生门",
        author: "芥川龙之介",
        price: "￥30.50",
        isbn: "9787208061644",
        imgSrc: "/assets/images/img/img_lsm.png",
        publisher: "上海人民出版社",
        discription: "《活着》是一部充满血泪的小说。余华通过一位中国农民的苦难生活 讲述了人如何去承受巨大的苦难；讲述了眼泪的丰富和宽广。",
        discount: "70%"
      }, 
      {
        id: 444,
        title: "月亮与六便士",
        author: "毛姆",
        price: "￥18.99",
        isbn: "9787506365437",
        imgSrc: "/assets/images/img/img_moon.png",
        publisher: "作家",
        discription: "《活着》是一部充满血泪的小说。余华通过一位中国农民的苦难生活 讲述了人如何去承受巨大的苦难；讲述了眼泪的丰富和宽广。",
        discount: "90%"
      }, 
      {
        id: 555,
        title: "皮囊",
        author: "蔡崇达",
        price: "￥22.49",
        isbn: "9787208061644",
        imgSrc: "/assets/images/img/img_pn.png",
        publisher: "上海人民出版社",
        discription: "《活着》是一部充满血泪的小说。余华通过一位中国农民的苦难生活 讲述了人如何去承受巨大的苦难；讲述了眼泪的丰富和宽广。",
        discount: "70%"
      }, 
      {
        id: 666,
        title: "人间失格",
        author: "太宰治",
        price: "￥15.66",
        isbn: "9787506365437",
        imgSrc: "/assets/images/img/img_rjsg.png",
        publisher: "作家出版社",
        discription: "《活着》是一部充满血泪的小说。余华通过一位中国农民的苦难生活 讲述了人如何去承受巨大的苦难；讲述了眼泪的丰富和宽广。",
        discount: "90%"
      }, 
      {
        id: 777,
        title: "小王子",
        author: "安托万·德·圣埃克苏佩里",
        price: "￥19.77",
        isbn: "9787208061644",
        imgSrc: "/assets/images/img/img_prince.png",
        publisher: "上海人民出版社",
        discription: "《活着》是一部充满血泪的小说。余华通过一位中国农民的苦难生活 讲述了人如何去承受巨大的苦难；讲述了眼泪的丰富和宽广。",
        discount: "70%"
      }, 
      {
        id: 888,
        title: "挪威的森林",
        author: "村上春树",
        price: "￥28.90",
        isbn: "9787506365437",
        imgSrc: "/assets/images/img/img_norway.png",
        publisher: "作家",
        discription: "《活着》是一部充满血泪的小说。余华通过一位中国农民的苦难生活 讲述了人如何去承受巨大的苦难；讲述了眼泪的丰富和宽广。",
        discount: "90%"
      }]
  },

  // when app launchs
  onLaunch: function(e) {
    console.log("应用启动：", e)
  },
})