// app.js

App({
  globalData: {
    
    // fundamental datas
    authorization: false,
    openId: '',//wechat id
    avatarUrl: '../../assets/images/avatar_default.png',
    loginStatus: false,
    isIpX: false,

    // user datas
    userInfo: {
      'id': 15,
      'name': 'Logan',
      'gender': '男',
      'age': 22,
      'phone': '17635349236',
      'email': '236981638@qq.com',
      'selfInfo': '热爱支教，热爱生活！',
      'type': '领队',
    },

    // my group info
    groupInfo:[
      {
        'id': 1,
        'name': '彩云支南',
        'leaderId': 2,
        'leaderName': 'Logan',
        'province': '云南省',
        'location': '盈江市',
        'school': '希望小学',
        'memberNum': 7,
        'picUrl': '../../assets/logo/3.png',
      },
      {
        'id': 2,
        'name': '七色阳光支教团',
        'leaderId': 1,
        'leaderName': 'Logan',
        'province': '四川省',
        'location': '宜宾市',
        'school': '李庄小学',
        'memberNum': 12,
        'picUrl': '../../assets/logo/8.png',
      },
      {
        'id': 3,
        'name': '烛火支教队伍',
        'leaderId': 3,
        'leaderName': 'Tanrui',
        'province': '广西省',
        'location': '盈江市',
        'school': '第一小学',
        'memberNum': 11,
        'picUrl': '../../assets/logo/1.png',
      }
    ],

    // all of the group infos
    groups: [
      {
        'id': 4,
        'name': '满天星支教队',
        'leaderId': 2,
        'leaderName': 'Liebling.',
        'province': '青海省',
        'location': '囊谦县',
        'school': '第三完全小学',
        'memberNum': 10,
        'picUrl': '../../assets/logo/7.png',
      },
      {
        'id': 5,
        'name': '青翼爱心支教团',
        'leaderId': 1,
        'leaderName': '志愿者1号',
        'province': '青海省',
        'location': '西宁市大通县',
        'school': '桥头第一小学',
        'memberNum': 15,
        'picUrl': '../../assets/logo/6.png',
      },
      {
        'id': 6,
        'name': '西望支教队',
        'leaderId': 3,
        'leaderName': '志愿者3号',
        'province': '甘肃省',
        'location': '武威市古浪县裴家营',
        'school': '镇中心小学',
        'memberNum': 9,
        'picUrl': '../../assets/logo/9.png',
      },
      {
        'id': 7,
        'name': '筑梦支教团队',
        'leaderId': 2,
        'leaderName': 'Foliage',
        'province': '广东省',
        'location': '梅州市丰顺县',
        'school': '仙洞小学',
        'memberNum': 16,
        'picUrl': '../../assets/logo/5.png',
      },
      {
        'id': 8,
        'name': '星火支教团队',
        'leaderId': 1,
        'leaderName': '星火',
        'province': '广西壮族自治区',
        'location': '百色市西林县那佐苗族乡',
        'school': '皆马小学',
        'memberNum': 8,
        'picUrl': '../../assets/logo/2.png',
      },
      {
        'id': 9,
        'name': '赤凤支教团队',
        'leaderId': 3,
        'leaderName': 'Guangshen',
        'province': '广西省',
        'location': '潮州市赤凤镇',
        'school': '峙溪中心学校',
        'memberNum': 12,
        'picUrl': '../../assets/logo/4.png',
      }
    ],

    //application of joining team
    application1: [
      {
        'appliId': 1,
        'time': '2019-03-28 21:49:37',
        'type': 0,
        'teamInfo': {
          'id': 2,
          'name': '七色阳光支教团',
          'leaderId': 1,
          'leaderName': 'Logan',
          'province': '四川省',
          'location': '宜宾市',
          'school': '李庄小学',
          'memberNum': 12,
          'picUrl': '../../assets/logo/8.png',
        },
        'userInfo': {
          'id': 15,
          'name': 'Liebling',
          'gender': '女',
          'age': 22,
          'phone': '15174285128',
          'email': 'Liebling17@163.com',
          'selfInfo': '愿做一只烛，为支教事业发光发热！',
          'type': '志愿者',
        },
      },
      {
        'appliId': 2,
        'time': '2019-03-17 15:29:02',
        'type': 0,
        'teamInfo': {
          'id': 1,
          'name': '彩云支南',
          'leaderId': 2,
          'leaderName': 'Logan',
          'province': '云南省',
          'location': '盈江市',
          'school': '希望小学',
          'memberNum': 7,
          'picUrl': '../../assets/logo/3.png',
        },
        'userInfo': {
          'id': 15,
          'name': 'Liebling',
          'gender': '女',
          'age': 22,
          'phone': '15174285128',
          'email': 'Liebling17@163.com',
          'selfInfo': '愿做一只烛，为支教事业发光发热！',
          'type': '志愿者',
        },
      },
    ],

    //application of publishing articles
    application2: [
      {
        'appliId': 3,
        'time': '2019-03-30 09:44:59',
        'type': 1,
        'userInfo': {
          'id': 15,
          'name': 'Liebling',
          'gender': '女',
          'age': 22,
          'phone': '15174285128',
          'email': 'Liebling17@163.com',
          'selfInfo': '愿做一只烛，为支教事业发光发热！',
          'type': '志愿者',
        },
        'articleInfo': {
          'id': 1,
          'title': '云南支教经验分享',
          'content': '当我第一次走进教室，全体同学都站起来高喊“老师好”，我不由地震动了下。当看见他们那么可爱，听到他们响亮的回答声音及嘹亮的歌声，自我好像回到从前，回到中学时代。看到他们那充满着渴望的双眼，听着他们那真稚的声音，自我有一种冲动，恨不得一下子把自我所有的知识传授给他们。支教三个月来，经历了许多事情，点点滴滴，一次又一次地让我深思;经历了许多感动，大大小小，一次又一次地影响着我。我走进了农村中学教育，了解了农村中学教育的现状，认识到了农村中学教育教学工作的困难与艰辛，体味到了农村中学老师的酸甜苦辣。',
          'picUrl': '../../assets/images/article/1.jpeg',
        },
      },
    ],

    //application of upload files
    application3: [
      {
        'appliId': 4,
        'time': '2019-03-26 04:47:29',
        'type': 2,
        'userInfo': {
          'id': 15,
          'name': 'Liebling',
          'gender': '女',
          'age': 22,
          'phone': '15174285128',
          'email': 'Liebling17@163.com',
          'selfInfo': '愿做一只烛，为支教事业发光发热！',
          'type': '志愿者',
        },
        'fileInfo': {
          'id': 1,
          'title': '云南支教计划.doc',
          'type': 'doc',
          'size': '526KB',
          'fileUrl': '../../assets/images/file/doc_file.png',
          'editTime': '2019-03-24 19:29:52',
        },
      },
      {
        'appliId': 5,
        'time': '2019-03-29 16:44:37',
        'type': 2,
        'userInfo': {
          'id': 15,
          'name': 'Liebling',
          'gender': '女',
          'age': 22,
          'phone': '15174285128',
          'email': 'Liebling17@163.com',
          'selfInfo': '愿做一只烛，为支教事业发光发热！',
          'type': '志愿者',
        },
        'fileInfo': {
          'id': 2,
          'title': '手语教学视频.mp4',
          'type': 'mp4',
          'size': '2.09MB',
          'fileUrl': '../../assets/images/file/mp4_file.png',
          'editTime': '2019-03-29 15:23:05',
        },
      },
      {
        'appliId': 6,
        'time': '2019-03-23 22:06:19',
        'type': 2,
        'userInfo': {
          'id': 15,
          'name': 'Liebling',
          'gender': '女',
          'age': 22,
          'phone': '15174285128',
          'email': 'Liebling17@163.com',
          'selfInfo': '愿做一只烛，为支教事业发光发热！',
          'type': '志愿者',
        },
        'fileInfo': {
          'id': 1,
          'title': '英语教学课件.pdf',
          'type': 'pdf',
          'size': '190KB',
          'fileUrl': '../../assets/images/file/pdf_file.png',
          'editTime': '2019-02-28 17:22:20',
        },
      },
    ],

  },

  // when app launchs
  onLaunch: function(e) {
    console.log("应用启动：", e)
  },
})