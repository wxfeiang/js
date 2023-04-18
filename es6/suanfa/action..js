/*
 * @Author: wxfeiang
 * @Description:
 * @Date: 2023-03-11 00:01:22
 * @LastEditTime: 2023-03-11 00:35:05
 * @FilePath: /js/es6/suanfa/action..js
 */
let obj = {
  arr: ["22"]
}
if (obj?.arr?.length > 0) {
  console.log("大雨0")
} else {
  console.log("bujinru ")
}

let arr = []
for (let i = 0; i < 9; i++) {
  arr.push({
    id: i,
    day: i,
    week: (i + 1) * 7,
    month: (i + 1) * 30
  })
}
console.log(arr)

/**
 * @description: 转换成 [ [],[],[], ]
 * @return {*}
 *  把 day  week  month
 */

let nerr = arr.reduce((p, v) => {
  const { id, ...surplus } = v
  p[id] = surplus
  return p
}, {})
console.log("🥨[nerr]:", nerr)
let len = Object.keys(nerr).length
console.log("🍫[len]:", len)

let al = 3
var myArr = new Array(al)
for (let i = 0; j < len; i++) {}
//  数组1
let arr1 = needArr(arr, "day")
let arr2 = needArr(arr, "week")
let arr3 = needArr(arr, "month")
console.log("🍝[arr1]:", arr1, arr3, arr3)

function needArr(arr, file) {
  return arr.map((i) => i[file])
}
