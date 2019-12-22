//index.js

//获取应用实例

const app = getApp()

Page({

  data: {
    anger: 0,
    disgust: 0,
    fear: 0,
    happiness: 0,
    neutral: 0,
    sadness: 0,
    surprise: 0,
    src: "",
    fengmian: "",
    videoSrc: "",
    who: "",
    openid: "",
    token: "",
    windowWidth: 0,
    trackshow: "贴表情",
    canvasshow: true,
    access_token: '',
    path: "",
    cavansl: 0,
    cavanst: 0,
    cavansw: 0,
    cavansh: 0,
    emoji: "",
    windowHeight: 0
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
    that.ctx = wx.createCameraContext()
    console.log("onLoad"),
      that.setData({
        openid: app.globalData.openid,
        token: app.globalData.token
      });
    // 每次更新access_token

    wx.request({

      url: "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + "hxgXHGGNQCUYQciFNDKf2uCj" + "&client_secret=" + "LqiSGHp181CsV0bePB8C3a9Rx3f1indM",

      method: 'POST',

      dataType: "json",

      header: {

        'content-type': 'application/json'

      },

      success: function (res) {

        // console.log(res.data.access_token);

        // app.globalData.access_token = res.data.access_token;

        that.setData({

          access_token: res.data.access_token

        });

      }

    })

    wx.hideLoading()



  },

  track(e) {

    var that = this

    if (e.target.dataset.trackshow == "贴表情") {

      that.setData({

        trackshow: "不贴表情",

        canvasshow: true

      })

      that.takePhoto()

      that.interval = setInterval(this.takePhoto, 500)

    } else {

      clearInterval(that.interval)

      that.setData({

        trackshow: "贴表情",

        canvasshow: false

      })

    }

  },

  takePhoto() {

    console.log("takePhoto")

    var that = this

    var takephonewidth

    var takephoneheight

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

            wx.uploadFile({ //上传图片到接口，获取人脸唯一标识，face_token

              url: "https://api-cn.faceplusplus.com/facepp/v3/detect",

              filePath: that.data.src, //刚才拍照的图片地址

              name: 'image_file',//图片的字段名和接口的字段要对应上

              header: {

                "Content-Type": "multipart/form-data" //必须用此header

              },

              formData: {

                'api_key': 'oET8FC1fmusINO4eeXlKvZZ0bsxp2BPT',//请填写你创建的 apikey

                'api_secret': 'J2NH9OGqKuQHis6WpJh3OP2x9Th5YjHK',//请填写你的api_secret

              },
              success: function (res) {

                var obj = JSON.parse(res.data); //转换成json格式不然解析不了

                that.setData({

                  face_token: obj['faces'][0]['face_token'],//获取得到的人脸标识

                });

                console.log(res)

                wx.request({

                  url: 'https://api-cn.faceplusplus.com/facepp/v3/face/analyze',

                  method: 'post',

                  data: {

                    'api_key': 'oET8FC1fmusINO4eeXlKvZZ0bsxp2BPT',//请填写你创建的 apikey

                    'api_secret': 'J2NH9OGqKuQHis6WpJh3OP2x9Th5YjHK',//请填写你的api_secret

                    'face_tokens': that.data.face_token,

                    'return_attributes': 'emotion',

                  },

                  header: {



                    'content-type': 'application/x-www-form-urlencoded',



                  },

                  success(res) {

                    console.log("res")

                    console.log(res.data.faces[0].face_rectangle)

                    console.log("res")

                    that.setData({

                      anger: res.data.faces[0].attributes.emotion.anger,

                      disgust: res.data.faces[0].attributes.emotion.disgust,

                      fear: res.data.faces[0].attributes.emotion.fear,

                      happiness: res.data.faces[0].attributes.emotion.happiness,

                      neutral: res.data.faces[0].attributes.emotion.neutral,

                      sadness: res.data.faces[0].attributes.emotion.sadness,

                      surprise: res.data.faces[0].attributes.emotion.surprise,

                    });



                  }

                })

              }
            });

            if (that.data.anger >= that.data.anger && that.data.anger >= that.data.disgust && that.data.anger >= that.data.fear && that.data.anger >= that.data.happiness && that.data.anger >= that.data.neutral && that.data.anger >= that.data.sadness && that.data.anger >= that.data.surprise) {

              that.setData({

                path: '../picture/angry.png',

                emoji: "angry"

              })
              app.data.angernumber++

            }

            if (that.data.disgust >= that.data.anger && that.data.disgust >= that.data.disgust && that.data.disgust >= that.data.fear && that.data.disgust >= that.data.happiness && that.data.disgust >= that.data.neutral && that.data.disgust >= that.data.sadness && that.data.disgust >= that.data.surprise) {

              that.setData({

                path: '../picture/disgust.png',

                emoji: "disgust"

              })
              app.data.disgustnumber++

            }



            if (that.data.fear >= that.data.anger && that.data.fear >= that.data.disgust && that.data.fear >= that.data.fear && that.data.fear >= that.data.happiness && that.data.fear >= that.data.neutral && that.data.fear >= that.data.sadness && that.data.fear >= that.data.surprise) {

              that.setData({

                path: '../picture/fear.png',

                emoji: "fear"

              })
              app.data.fearnumber++
            }

            if (that.data.happiness >= that.data.anger && that.data.happiness >= that.data.disgust && that.data.happiness >= that.data.fear && that.data.happiness >= that.data.happiness && that.data.happiness >= that.data.neutral && that.data.happiness >= that.data.sadness && that.data.happiness >= that.data.surprise) {

              that.setData({

                path: '../picture/happiness.png',

                emoji: "happiness"

              })
              app.data.happinessnumber++
            }

            if (that.data.sadness >= that.data.anger && that.data.sadness >= that.data.disgust && that.data.sadness >= that.data.fear && that.data.sadness >= that.data.happiness && that.data.sadness >= that.data.neutral && that.data.sadness >= that.data.sadness && that.data.sadness >= that.data.surprise) {

              that.setData({

                path: '../picture/sadness.png',

                emoji: "sadness"

              })
              app.data.sadnessnumber++

            }

            if (that.data.surprise >= that.data.anger && that.data.surprise >= that.data.disgust && that.data.surprise >= that.data.fear && that.data.surprise >= that.data.happiness && that.data.surprise >= that.data.neutral && that.data.surprise >= that.data.sadness && that.data.surprise >= that.data.surprise) {

              that.setData({

                path: '../picture/surprise.png',

                emoji: "surprise"

              })
              app.data.surprisenumber++

            }
            if (that.data.neutral >= that.data.anger && that.data.neutral >= that.data.neutral && that.data.neutral >= that.data.fear && that.data.neutral >= that.data.happiness && that.data.neutral >= that.data.neutral && that.data.neutral >= that.data.sadness && that.data.neutral >= that.data.surprise) {

              that.setData({

                path: '../picture/neutral.png',

                emoji: "neutral"

              })
              app.data.neutralnumber++
            }
            wx.request({
              url: "http://www.builtformachinelearningwsk.cn/posts/",
              data: {
                'recognize_img': res.data
              },
              method: 'POST',
              header: { 'Content-Type': 'application/x-www-form-urlencoded' },

              success: function (res) {

                console.log(res.data)
                var ctx = wx.createContext()
                ctx.stroke();
                that.data.cavansl = res.data.x/ takephonewidth * that.data.windowWidth
                that.data.cavanst = res.data.y / takephoneheight * that.data.windowHeight
                that.data.cavansw = res.data.w / takephonewidth * 16 / 9 * that.data.windowWidth
                that.data.cavansh = res.data.h / takephoneheight * 16 / 9 * that.data.windowHeight
                ctx.drawImage(that.data.path, that.data.cavansl - that.data.cavansw * 5 / 24, that.data.cavanst - that.data.cavansh * 7 / 24, that.data.cavansw, that.data.cavansh)
                wx.drawCanvas({
                  canvasId: 'canvas',
                  actions: ctx.getActions()
                })
              }
            })
          }
        })
      
        
      

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

  to: function () { wx.navigateTo({ url: '/pages/new/new', }) }

})

