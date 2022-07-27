/*
 * @Author: wxfeiang
 * @Description:
 * @Date: 2022-07-22 22:47:20
 * @LastEditTime: 2022-07-22 23:10:44
 * @FilePath: /js/lecode/1.js
 */
let l1 = [9, 9, 9, 9, 9, 9, 9],
  l2 = [9, 9, 9, 9]

var addTwoNumbers = function (l1, l2) {
  let a = parseInt(arr(l1)) // join('')
  let b = parseInt(arr(l2))

  function arr(array) {
    let str = ''
    array.forEach((item) => {
      str += item.toString()
    })
    return str
  }

  let c = a + b

  let d = c.toString().split('').reverse()

  return d
}

console.log(addTwoNumbers(l1, l2))
