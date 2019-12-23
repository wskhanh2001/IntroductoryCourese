
Page({
  //储存画图与显示需要的百分比
  data: {
    angernumbercpy: 0,
    disgustnumbercpy: 0,
    fearnumbercpy: 0,
    happinessnumbercpy: 0,
    neutralnumbercpy: 0,
    sadnessnumbercpy: 0,
    surprisenumbercpy: 0,
  },
  onLoad: function (options) {
    var that = this;
    var app=getApp()
    //计算百分比
    that.setData({
      angernumbercpy: app.data.angernumber / (app.data.angernumber + app.data.disgustnumber + app.data.fearnumber + app.data.happinessnumber + app.data.neutralnumber + app.data.sadnessnumber + app.data.surprisenumber),
      disgustnumbercpy: app.data.disgustnumber / (app.data.angernumber + app.data.disgustnumber + app.data.fearnumber + app.data.happinessnumber + app.data.neutralnumber + app.data.sadnessnumber + app.data.surprisenumber),
      fearnumbercpy: app.data.fearnumber / (app.data.angernumber + app.data.disgustnumber + app.data.fearnumber + app.data.happinessnumber + app.data.neutralnumber + app.data.sadnessnumber + app.data.surprisenumber),
      happinessnumbercpy: app.data.happinessnumber / (app.data.angernumber + app.data.disgustnumber + app.data.fearnumber + app.data.happinessnumber + app.data.neutralnumber + app.data.sadnessnumber + app.data.surprisenumber),
      neutralnumbercpy: app.data.neutralnumber / (app.data.angernumber + app.data.disgustnumber + app.data.fearnumber + app.data.happinessnumber + app.data.neutralnumber + app.data.sadnessnumber + app.data.surprisenumber),
      sadnessnumbercpy: app.data.sadnessnumber / (app.data.angernumber + app.data.disgustnumber + app.data.fearnumber + app.data.happinessnumber + app.data.neutralnumber + app.data.sadnessnumber + app.data.surprisenumber),
      surprisenumbercpy: app.data.surprisenumber / (app.data.angernumber + app.data.disgustnumber + app.data.fearnumber + app.data.happinessnumber + app.data.neutralnumber + app.data.sadnessnumber + app.data.surprisenumber),
    })
    //每0.5s刷新一次饼状图
    setInterval(function () {
      console.log("again")
      that.f()
    }, 500)  
  },








//画饼状图
    f: function() {
      var that=this;
      var app = getApp()
       //更新百分比
      that.setData({
        angernumbercpy: app.data.angernumber / (app.data.angernumber + app.data.disgustnumber + app.data.fearnumber + app.data.happinessnumber + app.data.neutralnumber + app.data.sadnessnumber + app.data.surprisenumber),
        disgustnumbercpy: app.data.disgustnumber / (app.data.angernumber + app.data.disgustnumber + app.data.fearnumber + app.data.happinessnumber + app.data.neutralnumber + app.data.sadnessnumber + app.data.surprisenumber),
        fearnumbercpy: app.data.fearnumber / (app.data.angernumber + app.data.disgustnumber + app.data.fearnumber + app.data.happinessnumber + app.data.neutralnumber + app.data.sadnessnumber + app.data.surprisenumber),
        happinessnumbercpy: app.data.happinessnumber / (app.data.angernumber + app.data.disgustnumber + app.data.fearnumber + app.data.happinessnumber + app.data.neutralnumber + app.data.sadnessnumber + app.data.surprisenumber),
        neutralnumbercpy: app.data.neutralnumber / (app.data.angernumber + app.data.disgustnumber + app.data.fearnumber + app.data.happinessnumber + app.data.neutralnumber + app.data.sadnessnumber + app.data.surprisenumber),
        sadnessnumbercpy: app.data.sadnessnumber / (app.data.angernumber + app.data.disgustnumber + app.data.fearnumber + app.data.happinessnumber + app.data.neutralnumber + app.data.sadnessnumber + app.data.surprisenumber),
        surprisenumbercpy: app.data.surprisenumber / (app.data.angernumber + app.data.disgustnumber + app.data.fearnumber + app.data.happinessnumber + app.data.neutralnumber + app.data.sadnessnumber + app.data.surprisenumber),
      })
    // 页面渲染完成
    //使用wx.createContext获取绘图上下文context
    var context = wx.createContext();
      var that = this;
    // 画饼图
    //    数据源
      var array = [that.data.angernumbercpy, that.data.disgustnumbercpy, that.data.fearnumbercpy, that.data.happinessnumbercpy, that.data.neutralnumbercpy, that.data.sadnessnumbercpy, that.data.surprisenumbercpy];
      var colors = ["#ed1941", "#ffc20e", "#7bbfea", "#cde6c7", "#f173ac", "#8552a1", "#65c294"];
    var total = 0;
    //    计算总量
    for( var index = 0; index<array.length;index++ ) {
  total += array[index];
}
//    定义圆心坐标
var point = { x: 110, y: 100 };
//    定义半径大小
var radius = 60;
/*    循环遍历所有的pie */
for (var i = 0; i < array.length; i++) 
{
  context.beginPath();
  //    	起点弧度
  var start = 0;
  if (i > 0) {
    // 计算开始弧度是前几项的总和，即从之前的基础的上继续作画
    for (var j = 0; j < i; j++) {
      start += array[j] / total * 2 * Math.PI;
    }
  }
 // console.log("i:" + i);
  //console.log("start:" + start);
  //      1.先做第一个pie
  //   	2.画一条弧，并填充成三角饼pie，前2个参数确定圆心，第3参数为半径，第4参数起始旋转弧度数，第5参数本次扫过的弧度数，第6个参数为时针方向-false为顺时针
  context.arc(point.x, point.y, radius, start, start + array[i] / total * 2 * Math.PI, false);
  //      3.连线回圆心
  context.lineTo(point.x, point.y);
  //      4.填充样式
  context.setFillStyle(colors[i]);
  //      5.填充动作
  context.fill();
  context.closePath();
}
//调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为
wx.drawCanvas({
  //指定canvasId,canvas 组件的唯一标识符
  canvasId: 'mypie',
  actions: context.getActions()
});
},
})