// pages/register/register.js
let app = getApp();

Page({
  data: {
    mobile: "",
    pwd: "",
    pwdOk: "",
    name: ""
  },

  mobileInput: function(e) {
    var inputMobile = e.detail.value
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(inputMobile)) {
      wx.showModal({
        title: '提示',
        content: '账号格式不正确',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;

    }
    //   wx.request({
    //     url: 'http://112.93.119.181:8090/zhyw/api/usersel/',
    //     // url: getApp().globalData.url,
    //     header: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     //定义传到后台的数据
    //     data: {
    //       //data中获取数据
    //       mobile: this.data.inputMobile,
    //     },
    //     method: 'POST',
    //     success: function (res) {
    //       var errcodes = res.data.errcode
    //       //判断手机号是否被注册
    //       if (errcodes==0) {
    //         wx.showModal({
    //           title: '提示',
    //           content: '手机号已被注册',
    //           success: function (res) {
    //             if (res.confirm) {
    //               console.log('用户点击确定')
    //             }
    //           }
    //         })

    //       }


    //     }
    //   })

    // return;
  },

  mobilePwdInput: function(e) {
    var pwds = e.detail.value; //以字母开头，长度在6-18之间，只能包含字符、数字和下划线。 
    if (!(/^[0-9a-zA-Z]{6,18}$/).test(pwds)) {
      wx.showModal({
        title: '提示',
        content: '密码格式不正确',
        success: function(e) {
          if (e.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
    return;
  },


  mobilePwdInputOk: function(e) {
    var pwdOks = e.detail.value;
    if (pwdOks != "") {
      wx.showModal({
        title: '提示',
        content: '密码不能为空',
        success: function(e) {
          if (e.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
    return;
  },



  // 注册用户信息
  formSubmit: function(e) {
    var mobiles = e.detail.value.mobileName;
    var adminNames = e.detail.value.adminName;
    var pwdNames = e.detail.value.pwdName;
    var pwdOkNames = e.detail.value.pwdOkName;




    if (mobiles == "" || adminNames == "" || pwdNames == "" || pwdOkNames == "") {
      wx.showModal({
        title: '提示',
        content: '请完善资料信息',
        success: function (e) {
          if (e.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return; 
     }
      //判断两次密码输入是否一致
      if (pwdNames != pwdOkNames) {
        wx.showModal({
          title: '提示',
          content: '两次输入密码不一致,请重新输入',
          success: function(e) {
            if (e.confirm) {
              console.log('用户点击确定')
            }
            return;
          }
        
        })
      
      }else{
        wx.request({
          url: 'http://112.93.119.181:8090/zhyw/api/usersel/',
          // url: getApp().globalData.url,
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          //定义传到后台的数据
          data: {
            //data中获取数据
            mobile: e.detail.value.mobileName, 
          },
          method: 'POST',
          success: function (res) {
            var errcodes = res.data.errcode
            //判断手机号是否被注册
            if (errcodes != 0) {
              wx.showModal({
                title: '提示',
                content: '手机号已被注册',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                  return;
                }
              
              })
              
            } else {


              wx.request({
                url: 'http://112.93.119.181:8090/zhyw/api/useradd/',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                //定义传到后台的数据
                data: {
                  //data中获取数据
                  mobile: mobiles,
                  pwd: pwdNames,
                  name: adminNames,
                },
                method: 'POST',
                success: function (res) {
                  var errcodess = res.data.errcode
                  if (errcodess == 0) {
                    wx.showModal({
                      title: '提示',
                      content: '注册成功', // 显示模态弹窗
                      success: function (e) {
                        if (e.confirm) {
                          // 点击确定后跳转登录页面并关闭当前页面
                          wx.redirectTo({
                            url: '../login/login?mobile=' + mobiles + '&pwd?=' + pwdNames + '&name?=' + adminNames
                          })
                        }
                      }
                    })
                  } else {
                    // 显示消息提示框
                    wx.showToast({
                      title: '注册失败',
                      icon: 'error',
                      duration: 2000
                    })
                  }
                }
              })
            }


          }
        })
      }
      

     
      
    
   
 
  }
})