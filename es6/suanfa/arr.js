/*
 * @Author: wxfeiang
 * @Description:
 * @Date: 2022-06-15 09:07:25
 * @LastEditTime: 2023-06-20 22:22:52
 * @FilePath: /js/es6/suanfa/arr.js
 */
//del: konk
// fix:
// del:

var data = [
  {
    a: 1,
    consuption: "2323",
    conName: "1"
  },
  {
    a: 1,
    consuption: "2323",
    conName: "1"
  },
  {
    a: 1,
    consuption: "2323",
    conName: "1"
  }
]

/**
 * @description: sdsa
 * @param {} data
 * @return {}
 */
function newArr(data) {
  var newarr = []
  data.forEach((item) => {
    newarr.push({
      name: item.conName,
      value: item.consuption
    })
  })

  return newarr
}

console.log(newArr(data))
