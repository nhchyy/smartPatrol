// var util = require('../utils/md5.js')
var app = getApp();
var MCAP = require('../../utils/mcaptcha.js');
Page({
  //定义全局变量data
  data: {
    mobile: "",
    pwd: "",
    errmsg: "",
    errcode: "",
    imgCode: "", //生成的验证码
    code: "" //输入的验证码
  },


  //处理accountInput的触发事件
  accountInput: function (e) {
    var mobiles = e.detail.value; //从页面获取到用户输入的用户名/邮箱/手机号
    if (mobiles != '') {
      this.setData({
        mobile: mobiles
      }); //把获取到的密码赋值给全局变量Date中的account
    }
  },


  //处理pwdBlurt的触发事件
  pwdBlur: function (e) {
    var pwds = e.detail.value; //从页面获取到用户输入的密码
    if (pwds != '') {
      // let pwdMd5= util.hexMD5(pwds); 
      this.setData({
        pwd: pwds
      }); //把获取到的密码赋值给全局变量Date中的password
    }
  },


  //处理login的触发事件
  login: function () {

    let mobiles = this.data.mobile;
    let pwds = this.data.pwd;

    var imgCod = this.data.imgCode;
    var imgCodes = imgCod.toLowerCase();


    var cods = this.data.code
    var cod = cods.toLowerCase();



    //检验非空
    if (mobiles.length == 0) {
      wx.showModal({
        title: '提示',
        content: '账号不能为空！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;
    }

    if (pwds.length == 0) {
      wx.showModal({
        title: '提示',
        content: '密码不能为空！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;
    }

    // if (cod == "" || cod == null) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请输入图形验证码！',
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       }
    //     }
    //   })
    //   return;
    // }

    if (mobiles.length != 11) {
      wx.showModal({
        title: '提示',
        content: '手机号长度不正确',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;
    }

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobiles)) {
      wx.showModal({
        title: '提示',
        content: '账号格式不正确',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;

    }

    if (cod != imgCodes) {
      // if (cod == imgCodeS) {
      wx.showModal({
        title: '提示',
        content: '图形码错误！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })

      return;
    } else {
      wx.request({
        // url: 'http://112.93.119.181:8090/zhyw/api/login/',
        url: app.globalData.serverUrl + '/zhyw/api/login/',
        header: {
          //'content-type': 'application/json' // 默认值
          "Content-Type": "application/x-www-form-urlencoded"
        },
        //定义传到后台的数据
        data: {
          //data中获取数据
          mobile: this.data.mobile,
          pwd: this.data.pwd,
          type: '1'
        },
        method: 'POST',
        fail: function (res) {
          console.log(res.data);

        },
        success: function (res) {
          // console.log("调用API成功");
          console.log(res.data);
          console.log(res.data.errcode);

          // let uid = res.data.userid
          // let uname = res.data.name
          // let mob = res.data.mobile
          if (res.data.errcode == 0) {
            app.globalData.mobile = res.data.mobile;
            app.globalData.name = res.data.name;
            app.globalData.roleID = res.data.role;

            wx.reLaunch({
              url: '../index/index'
              // url: '../shoupage/shoupage?userid=' + uid + '&name=' + uname + '&mobile=' + mob,
              // url: '../shoupage/shoupage'
            })


          } else {
            wx.showModal({
              title: '提示',
              content: '用户名或者密码错误',
              showCancel: false
            })
          }
        },

      })

    }
  },





  /**
   * 初始化验证码
   */
  onLoad: function (options) {
    this.initDraw(); //生成验证码
  },

  /**
   * 制作验证码
   */
  initDraw() {
    var that = this;
    var codes = that.getRanNum();
    that.setData({
      imgCode: codes //生成的验证码
    })


    new MCAP({
      el: 'canvas',
      width: 120,
      height: 45,
      code: codes
    });
  },

  /**
   * 更换验证码
   */
  changeImg: function () {
    this.initDraw();
  },

  /**
   * 图片验证码绑定变量 
   */
  bindCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },


  /**
   * 点击提交触发
   */
  saves: function () {
    console.log('输入的验证码为：' + this.data.code)
  },


  /**
   * 获取随机数
   */
  getRanNum: function () {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var pwd = '';
    for (var i = 0; i < 4; i++) {

      pwd += chars.charAt(Math.random() * 48 - 1);

    }
    return pwd;
  },

  //跳转注册页面
  goRegister: function () {
    wx.reLaunch({
      url: '../register/register'
    })
  }

})