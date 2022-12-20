/*
 * @Author: wxfeiang
 * @Description: ts 内容
 * @Date: 2022-12-20 19:38:53
 * @LastEditTime: 2022-12-20 22:16:19
 * @FilePath: /js/ts/index.ts
 */
// 类型注解  类型约束
// 常用基础类型  String Boolean Number Null undefined Symbol
// 联合类型 自定义  接口类型  高级类型
let a: String = 'sd'
// interface obj: any

interface peop {
  name: string
  age: number
}
interface peopw {
  name: string
  age: number
  b: boolean
  c: null
  d: undefined
}
let arr1: number[] = []
arr1[3] = 'sdsd' // 报错

let arr2: string[] = []
let arr3: (string | number)[] = [] // 联合类型
arr3 = [2, '3', 33, false] // 后面不符合类型的会报错

// 指定  type  类型

type CusterArry = (string | number)[]

let ads: CusterArry = ['2', 3, 'ssss', false] // 后面的会报错
let ads2: CusterArry = ['2', 3]

//=====================================
//  函数类型 参数 返回值

// 单独指定
function sum(num1: number, num2: number) {
  return num1 + num2
}
sum(1, 2)
sum(2, 'w') // error

// 指定返回值
function sum2(num1: number, num2: number): number {
  return num1 + num2
}

sum2(1, 2)
sum2(2, 'w') // error

// 指定返回值
const add1 = (num1: number, num2: number): number => {
  return num1 + num2
}

//  同时指定参数喝返回值
//  值适用于函数表达式
// 类似于箭头函数  :(num1: number, num2: number )=> number
//  后面的函数不在需要指定了

const add2: (num1: number, num2: number) => number = (num1, num2) => {
  return num1 + num2
}

// 函数没有返回值 默认 :void
function voildTest(): void {
  console.log('没有返回值')
}

// 函数可选参数 参数后面加  ？   可选参数后面不能出现必传参数

function mysclic(str1: string, str2?: string) {
  console.log(str1)
  console.log(str2, ' 可选参数')
}

mysclic('1', '2')
mysclic('1')

// 不换行用 分号 ； 换行了 不用分号
//  不可与 json  d队形混淆

let json1: { name: string; age: number; say(): void } = {
  name: 'sds',
  age: 19,
  say() {
    console.log('say')
  }
}
let json2: {
  name: string
  age: number
  say(): void
} = {
  name: 'sds',
  age: 19,
  say() {
    console.log('say')
  }
}

// 接口定义
interface Ipeop {
  name: string
  age: number
  say: () => void
}
// 接口使用

let json3: Ipeop = {
  // aa: "sd"  // 报错
  name: 'sds',
  age: 19,
  say: function () {}
}

//===================================
// 对比类型别名
// type
// 接口是只能指定对象
// 类型 可以指定任意类型

//==================================
// 接口之间的继承
interface ip2 {
  file1: string
}

interface ip3 extends ip2 {
  add: () => void
}

let extends2: ip3 = {
  // 通过继承 同时拥有2和 3
  //sss: 'sss' // error

  file1: '232',
  add: function () {
    console.log('aa')
  }
}

//======================================
// 元组 类型
//  严谨写法  规定确定知道 包含多少个 ，以及特性和类型
//  使用标记类型
let flog: [number, string] = [1, '22']

// 类型推论
let int = 14
let str = 'sss'
int = 'ss' // error

//  省略函数返回值的时候 返回number
function intadd(num1: number, num2: number) {
  return num1 + num2
}

// 能省略类型注解的 尽量省略   利用ts  自生 的推论

// 类型断言  通过 关键字 as

const aLink = document.getElementById('id')

const aLink2 = document.getElementById('id') as HTMLAnchorElement

// 这样就可以获取到 a 标签的属性 aLink2.href    react 中会用到

// 字面量类型

let str1 = 'Hellow  TS '
const str2 = 'Hellow TS '

// 出现两种类型不一样的情况  常量 和变量

let age: 18 = 18
age = 19 // error

// 用途  用于表示一组明确的数
function exper(action: 'up' | 'down') {
  console.log('action ', action)
}
exper('ss') //error
exper('up') //suess
// 可选值类型更加明确

type action = 'up' | 'down' | 'right' | 'left'
function exper2(action: action) {
  console.log('action ', action)
}
exper2('right')

// 枚举类型 enum
// 需改上面的 type

enum Action {
  up,
  down,
  right,
  left
}

function exper3(action: Action) {
  console.log('action ', action)
}

exper3(Action.down) // 类似于对像的 取值

//枚举成员的值  和 数字枚举
enum Action2 { // 是数字 自增
  up = 10,
  down,
  right,
  left
}
//

enum Action3 { // 没有自增长行为
  up = 'up',
  down = 'down'
}
// 枚举的特性  不仅是类型 还提供了值  会被编译成js
