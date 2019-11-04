// var util = require('../utils/md5.js') 
var MCAP = require('../utils/mcaptcha.js');
Page({
  //定义全局变量data
  data: {
    mobile: "",
    pwd: "",
    errmsg: "",
    errcode: "",
    codeStr: "", //生成的验证码
    code: "" //输入的验证码
  },


  //处理accountInput的触发事件
  accountInput: function (e) {
    var username = e.detail.value;//从页面获取到用户输入的用户名/邮箱/手机号
    if (username != '') {
      this.setData({ mobile: username });//把获取到的密码赋值给全局变量Date中的account
    }
  },


  //处理pwdBlurt的触发事件
  pwdBlur: function (e) {
    var pwds = e.detail.value;//从页面获取到用户输入的密码
    if (pwds != '') {
      // let pwdMd5= util.hexMD5(pwds); 
      this.setData({ pwd: pwds });//把获取到的密码赋值给全局变量Date中的password
    }
  },


  //处理login的触发事件
  login: function () {

    let mobiles = this.data.mobile;
    let pwds = this.data.pwd;
    let codes = this.data.codeStr;
    let cod = this.data.code;
    //检验非空
    if (mobiles.length == 0 || pwds.length == 0) {
      wx.showModal({
        title: '提示',
        content: '账号密码不能为空！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      wx.request({
        url: 'http://112.93.119.181:8090/zhyw/api/login/',
        header: {
          //'content-type': 'application/json' // 默认值
          "Content-Type": "application/x-www-form-urlencoded"
        },
        //定义传到后台的数据
        data: {
          //从全局变量data中获取数据
          mobile: this.data.mobile,
          pwd: this.data.pwd,
          type: '1'
        },
        method: 'POST',
        success: function (res) {
          // console.log("调用API成功");
          console.log(res.data);
          console.log(res.data.errcode);

          let uid = res.data.userid
          let uname = res.data.name
          let mob = res.data.moblie
          if (res.data.errcode == 0) {
            wx.navigateTo({
              url: '/a_login/a_login？userid='+uid+'&name'+uname+'&mobile'+mob,
             
            })
          }
          else {
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
    var that = this;
    that.initDraw(); //生成验证码
  },

  /**
   * 制作验证码
   */
  initDraw() {
    var that = this;
    var codes = that.getRanNum();
    that.setData({
      codeStr: codes //生成的验证码
    })


    new MCAP({
      el: 'canvas',
      width: 120,
      height: 50,
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
      if (Math.random() < 48) {
        pwd += chars.charAt(Math.random() * 48 - 1);
      }
    }
    return pwd;
  },


  // 绑定微信号
  getPhoneNumber(e) {
    var That = this;
    var data = {
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      openid: That.data.openid,
      session_key: That.data.session_key
    }
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showToast({
        title: '授权失败，请重新授权',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showLoading({
        title: '授权中',
        mask: true
      });
      That.setData({
        getNumber: false,
      });
      wx.request({
        method: "GET",
        url: api.getNumber,
        data: data,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var phoneNum = res.data;
          // 隐藏授权框
          wx.hideLoading()
          // 存储手机号到本地
          wx.setStorage({
            key: 'phone',
            data: phoneNum
          })
          //提示用户授权成功
          wx.showToast({
            title: '授权成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },

})