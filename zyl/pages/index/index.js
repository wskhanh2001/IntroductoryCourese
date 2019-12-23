//index.js

//获取应用实例

const app = getApp()

Page({

  data: {
    src: "",//照片临时存储位置位置
    windowWidth: 0,//屏幕宽度
    windowHeight: 0,//屏幕高度
    trackshow: "贴表情",//按钮名称
    canvasshow: true,//是否贴图
    path: "",//表情位置
    cavansl: 0,//面部位置left
    cavanst: 0,//面部位置top
    cavansw: 0,//面部宽度1wide
    cavansh: 0,//面部高度height
    emoji: '',//当前表情
  },
  onLoad() {
    var that = this
    var that = this
    wx.showLoading({
      title: '努力加载中',
      mask: true
    })
    //屏幕宽度
    var sysInfo = wx.getSystemInfoSync()
    that.setData({
      windowWidth: sysInfo.windowWidth,
    })
    //屏幕高度
    wx.getSystemInfo({
      success(res) {
        that.setData({
          windowHeight: res.windowHeight*0.885,
        })
      }, fail() {
        var a = that.data.windowWidth
        that.setData({
          windowHeight: a,
        })
      }
    })
    //用camera组件
    that.ctx = wx.createCameraContext()
    console.log("onLoad"),
    that.setData({
        openid: app.globalData.openid,
        token: app.globalData.token
    });
    // 每次更新access_token

    

    wx.hideLoading()



  },
//贴表情按钮
  track() {

    var that = this

    if (that.data.trackshow== "贴表情") {

      that.setData({

        trackshow: "不贴表情",

        canvasshow: true

      })

      that.takePhoto()

      that.interval = setInterval(this.takePhoto, 300)//0.3s拍一次照

    } else {

      clearInterval(that.interval)

      that.setData({
        trackshow: "贴表情",
        canvasshow: false,
        //保证本次贴图将会与
        cavansw: 0,//面部宽度width
        cavansh: 0,//面部高度height

      })

    }

  },

//“贴表情”按钮后的操作
  takePhoto() {

    console.log("takePhoto")

    var that = this
// 获取图片宽高
    var takephonewidth
    var takephoneheight
//开始照相
    that.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath //得到拍照后的图片地址
        });
        //console.log(res.tempImagePath),
        // 获取图片真实宽高
        wx.getImageInfo({
          src: res.tempImagePath,
          success: function (res) {
            takephonewidth = res.width,
              takephoneheight = res.height
          }
        })
        // console.log(takephonewidth, takephoneheight)
        wx.getFileSystemManager().readFile({
          filePath: res.tempImagePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            // console.log('data:image/png;base64,' + res.data).
            var that = this;
            //调用自己的接口
            wx.request({
              url: "http://www.builtformachinelearningwsk.cn/posts/",//自己的服务器
              data: {
                'recognize_img': res.data//base64格式的图片
              },
              method: 'POST',//post调用
              header: { 'Content-Type': 'application/x-www-form-urlencoded' },//必须是这个header

              success: function (res) {

                //console.log(res.data)
                //canvas组件
                var ctx = wx.createContext()
                ctx.stroke();
                //判断表情
                that.data.emoji = res.data.emtion
                console.log(that.data.emoji)
                if (that.data.emoji == 0) {
                  that.setData({
                    path: '../picture/angry.png',
                    emoji: "angry"
                  })
                  app.data.angernumber++
                }
                if (that.data.emoji == 1) {
                  that.setData({
                    path: '../picture/disgust.png',
                    emoji: "disgust"
                  })
                  app.data.disgustnumber++
                }
                if (that.data.emoji ==2) {
                  that.setData({
                    path: '../picture/fear.png',
                    emoji: "fear"
                  })
                  app.data.fearnumber++
                }
                if (that.data.emoji == 3) {
                  that.setData({
                    path: '../picture/happiness.png',
                    emoji: "happiness"
                  })
                  app.data.happinessnumber++
                }
                if (that.data.emoji == 4) {
                  that.setData({
                    path: '../picture/sadness.png',
                    emoji: "sadness"
                  })
                  app.data.sadnessnumber++
                }

                if (that.data.emoji == 5) {

                  that.setData({

                    path: '../picture/surprise.png',

                    emoji: "surprise"

                  })
                  app.data.surprisenumber++
                }
                if (that.data.emoji == 6) {
                  that.setData({
                    path: '../picture/neutral.png',
                    emoji: "neutral"
                  })
                  app.data.neutralnumber++
                }
                //位置与大小
                that.data.cavansl = res.data.x / takephonewidth * that.data.windowWidth
                that.data.cavanst = res.data.y / takephoneheight * that.data.windowHeight
                that.data.cavansw = res.data.w / takephonewidth * 16 / 9 * that.data.windowWidth
                that.data.cavansh = res.data.h / takephoneheight * 16 / 9 * that.data.windowHeight
                ctx.drawImage(that.data.path, that.data.cavansl - that.data.cavansw * 5 / 24, that.data.cavanst - that.data.cavansh * 7 / 24, that.data.cavansw, that.data.cavansh)
                //画图
                wx.drawCanvas({
                  canvasId: 'canvas',
                  actions: ctx.getActions()
                })
              }
            })

          
            
          }
        })
      
        //当偶尔调用失败时避免表情消失导致卡顿效果导致降低用户体验
        var ctx = wx.createContext()
        ctx.stroke();
        ctx.drawImage(that.data.path, that.data.cavansl - that.data.cavansw * 5 / 24, that.data.cavanst - that.data.cavansh * 7 / 24, that.data.cavansw, that.data.cavansh)
        wx.drawCanvas({
          canvasId: 'canvas',
          actions: ctx.getActions()
        })
      }
    })
  },
 

})

