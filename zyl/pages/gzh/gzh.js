var app=getApp()
Page({ 
  data: {
    flags:1,
    fruit:"",
    value:"",
    button:"",
    needbutton:"",
    items: [
      { name: 'A', value: '听音乐'  },
      { name: 'B', value: '看电影'},
      { name: 'C', value: '看书' },
    ],
  },
  onLoad(){
    if ((app.data.happinessnumber >= app.data.angernumber && app.data.happinessnumber >= app.data.disgustnumber && app.data.happinessnumber >= app.data.fearnumber && app.data.happinessnumber >= app.data.happinessnumber && app.data.happinessnumber >= app.data.neutralnumber && app.data.happinessnumber >= app.data.sadnessnumber && app.data.happinessnumber >= app.data.surprisenumber) || (app.data.neutralnumber >= app.data.angernumber && app.data.neutralnumber >= app.data.disgustnumber && app.data.neutralnumber >= app.data.fearnumber && app.data.neutralnumber >= app.data.happinessnumber && app.data.neutralnumber >= app.data.neutralnumber && app.data.neutralnumber >= app.data.sadnessnumber && app.data.neutralnumber >= app.data.surprisenumber) || (app.data.surprisenumber >= app.data.angernumber && app.data.surprisenumber >= app.data.disgustnumber && app.data.surprisenumber >= app.data.fearnumber && app.data.surprisenumber >= app.data.happinessnumber && app.data.surprisenumber >= app.data.neutralnumber && app.data.surprisenumber >= app.data.sadnessnumber && app.data.surprisenumber >= app.data.surprisenumber))
    {
      this.setData({
        flags:0
      })
    }
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },
  submit:function(){
    console.log(this.data.value)
      if(this.data.flags==1)
      {
        if (this.data.value == "A") {
          this.setData({
            fruit: "苹果"
          })
        }
        if (this.data.value == "B") {
          this.setData({
            fruit: "香蕉"
          })
        }
        if (this.data.value == "C") {
          this.setData({
            fruit: "橙子"
          })
        }
      }
      else
      {
        if (this.data.value == "A") {
          this.setData({
            fruit: "草莓"
          })
        }
        if (this.data.value == "B") {
          this.setData({
            fruit: "芒果"
          })
        }
        if (this.data.value == "C") {
          this.setData({
            fruit: "火龙果"
          })
        }
      }
      console.log(this.data.fruit)
    if (app.data.angernumber >= app.data.angernumber && app.data.angernumber >= app.data.disgustnumber && app.data.angernumber >= app.data.fearnumber && app.data.angernumber >= app.data.happinessnumber && app.data.angernumber >= app.data.neutralnumber && app.data.angernumber >= app.data.sadnessnumber && app.data.angernumber >= app.data.surprisenumber)
    {
     this.setData({
       button:"请按遥控器上的D按钮",
       needbutton: "D"
     })
    }
      if (app.data.disgustnumber >= app.data.angernumber && app.data.disgustnumber >= app.data.disgustnumber && app.data.disgustnumber >= app.data.fearnumber && app.data.disgustnumber >= app.data.happinessnumber && app.data.disgustnumber >= app.data.neutralnumber && app.data.disgustnumber >= app.data.sadnessnumber && app.data.disgustnumber>= app.data.surprisenumber)
      { 
        this.setData({
          button: "请按遥控器上的右键按钮",
          needbutton: "右键"
        })
      }
        if (app.data.fearnumber >= app.data.angernumber && app.data.fearnumber >= app.data.disgustnumber && app.data.fearnumber >= app.data.fearnumber && app.data.fearnumber >= app.data.happinessnumber && app.data.fearnumber >= app.data.neutralnumber && app.data.fearnumber >= app.data.sadnessnumber && app.data.fearnumber>= app.data.surprisenumber)
        {
          this.setData({
            button: "请按遥控器上的左键",
            needbutton: "左键"
          })
         }
          if (app.data.happinessnumber >= app.data.angernumber && app.data.happinessnumber >= app.data.disgustnumber && app.data.happinessnumber >= app.data.fearnumber && app.data.happinessnumber >= app.data.happinessnumber && app.data.happinessnumber >= app.data.neutralnumber && app.data.happinessnumber >= app.data.sadnessnumber && app.data.happinessnumber>= app.data.surprisenumber)
          {
            this.setData({
              button: "请按遥控器上的C按钮",
              needbutton: "C"
            })
           }
            if (app.data.neutralnumber >= app.data.angernumber && app.data.neutralnumber >= app.data.disgustnumber && app.data.neutralnumber >= app.data.fearnumber && app.data.neutralnumber >= app.data.happinessnumber && app.data.neutralnumber >= app.data.neutralnumber && app.data.neutralnumber >= app.data.sadnessnumber && app.data.neutralnumber>= app.data.surprisenumber)
            { 
              this.setData({
                button: "请按遥控器上的A按钮",
                needbutton: "A"
              })
            }
              if (app.data.sadnessnumber >= app.data.angernumber && app.data.sadnessnumber >= app.data.disgustnumber && app.data.sadnessnumber >= app.data.fearnumber && app.data.sadnessnumber >= app.data.happinessnumber && app.data.sadnessnumber >= app.data.neutralnumber && app.data.sadnessnumber >= app.data.sadnessnumber && app.data.sadnessnumber>= app.data.surprisenumber)
              { 
                this.setData({
                  button: "请按遥控器上的E按钮",
                  needbutton: "E"
                })
              }
                if (app.data.surprisenumber >= app.data.angernumber && app.data.surprisenumber >= app.data.disgustnumber && app.data.surprisenumber >= app.data.fearnumber && app.data.surprisenumber >= app.data.happinessnumber && app.data.surprisenumber >= app.data.neutralnumber && app.data.surprisenumber >= app.data.sadnessnumber && app.data.surprisenumber>= app.data.surprisenumber)
                { 
                  this.setData({
                    button: "请按遥控器上的B按钮",
                    needbutton: "B"
                  })
                }
    if(this.data.button!=''&&this.data.fruit!='')
    {
      wx.showModal({

        content: this.data.button + ",并在公众号对话框中回复" + this.data.needbutton + "+" + this.data.fruit,
        success: function (res) {
          if (res.confirm) { wx.navigateTo({ url: '/pages/switch/switch', }) }
          else { console.log('点击取消回调') }
        }
      })
    }
    else{
      wx.showModal({
        title:"错误",
        content: "未选择！"
      })
    }
  }
}) 