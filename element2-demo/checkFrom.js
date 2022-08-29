/*
 * @Author: wxfeiang
 * @Description:
 * @Date: 2022-08-24 16:30:20
 * @LastEditTime: 2022-08-24 16:33:25
 * @FilePath: /js/element2-demo/checkFrom.js
 */
// 表单名字组
let formName = []

//封装验证函数
function checkForm(formName) {
  let _self = this
  _self.resultArr = []
  let result = new Promise(function (resolve, reject) {
    _self.$refs[formName].validate((valid) => {
      if (valid) {
        resolve()
      } else {
        reject()
      }
    })
  })
  _self.resultArr.push(result) //push 得到promise的结果
}

//
function submitForm() {
  let _self = this
  _self.formarr.forEach((item) => {
    //根据表单的ref校验
    _self.checkForm(item)
  })
  //resultArr数组的值必须是promise对象才能使用Promise.all，在checkForm做了这一步
  Promise.all(_self.resultArr)
    .then(function () {
      //都通过了
      _self.subData()
      console.log('所有表单验证通过')
      // TODO:可直接执行你的提交 数据
      // 该区域使用this无效，promise内面的this表示局部，并不代表VueComponet实例
    })
    .catch(function () {
      console.log('err')
    })
}
