//index.js
//获取应用实例
const app = getApp()
//登陆界面
Page({
  data: {
    motto: '欢迎使用！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },
  //事件处理函数

  onLoad: function () {
    wx.showModal({
      content: "由于上线的微信小程序只能调用https接口，无法调用我们使用的http接口，希望助教能够在开发者工具上体验全功能。"
    })
    var that=this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }



  },
  //获取用户信息
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onGotUserInfo: function (e) {
   
  },
  //跳转进入小程序功能页面
  to: function () {
    //跳转至在在tabBar中的页面需要用
    wx.switchTab({
      url: '../index/index',
      success(res) {
        //尝试使用用户登录但是后来放弃想参考可以参考以下代码



        /*var that = this
        wx.login({
          success(r) {
            if (r.code) {
              console.log(r.code)
              wx.getUserInfo({
                success(res) {
                  var obj = JSON.parse(res.rawData); //转换成json格式不然解析不了
                  console.log(obj["nickName"])
                  var nickname = obj["nickName"]
                  wx.request({
                    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: 'http://www.builtformachinelearningwsk.cn/login/',
                    method: 'POST',
                    data: {
                      "code": r.code,
                      "nickname": nickname
                    },
                    success(res) {
                      console.log(res)
                    }
                  })
                }
              })

            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })*/
      }
    })
  },
  
})
