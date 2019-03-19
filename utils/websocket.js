// websocket.js

var url = 'ws://101.132.69.33:2333/chat';
import Toast from '../dist/toast/toast';

// Connect
function connect(groupId, wechaId, func) {
  // Connect to Socket
  wx.connectSocket({
    url: url + '/' + groupId + '/' + wechaId,
    header: {
      'content-type': 'application/json'
    },
    success: function(res) {
      console.log('信道连接成功')
    },
    fail: function() {
      console.log('信道连接失败')
    }
  })
  // Open Socket
  wx.onSocketOpen(function(res) {
    console.log("信道开通")
    // func: retrive data from server
    wx.onSocketMessage(func);
  });
  // Error Socket
  wx.onSocketError(function(res) {
    Toast({
      duration: 1500,
      message: '信道连接失败，请检查',
    });
    // wx.showToast({
    //   title: '信道连接失败，请检查',
    //   duration: 1500
    // })
  })
}

// send message
function send(msg) {
  wx.sendSocketMessage({
    data: msg
  });
  console.log("websocket:send | 此刻发送的消息：", msg)
}

// export functions
module.exports = {
  connect: connect,
  send: send
}