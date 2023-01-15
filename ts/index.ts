/*
 * @Author: wxfeiang
 * @Description: ts 内容
 * @Date: 2022-12-20 19:38:53
 * @LastEditTime: 2022-12-22 17:05:23
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

let anyp: any = '2222'
anyp = 32

// any  任意类型  尽量少用  或者临时使用
// 隐式 具有 any  类型
// 申明变量  没有初始值
// 申明函数 参数 没有指定类型
//=====================================

console.log(typeof 'hello TS ')

// typeof 与js 不同点 可以直接获取类型
let ptype = {
  // 省略了注解
  x: 1,
  y: '2'
}

function fontType(point: typeof ptype) {
  // 当前参数就为对象类型
  console.log(point)
}
// fontType('sss')
fontType({ x: 1, y: '22222' }) // 来自ptype 的数据

//===================高级类型==================
class Person {
  age: number = 12
  name = 'wangpeng '
}
const peop = new Person()

console.log(peop.name)

//  构造函数
class Car {
  age: number
  name: string
  constructor(age: number, name: string) {
    this.age = age
    this.name = name
  }
}
const Dcar = new Car(19, 'dycar')
// const Dcar2 = new Car('sd', 'dycar') // 报错

//实例 对象方法

class porit {
  x: 1
  y: 1
  sclic(n: number) {
    this.x *= n
    this.y *= n
  }
}
const peopr = new porit()

// class 继承和 extends

class child extends porit {
  showChild() {
    console.log()
  }
}

const newChild = new child() //  可以调用各种方法

//  类继承接口
interface sings {
  sing(): void
  name: string
}

class apple implements sings {
  sing() {}
  name: 'sss' // 继承接口里的属性方法
}

//  目的 为类 添加约束
// class  成员的可见性   public  protected   private  readonly

class Amila {
  public move() {
    //  默认的公开属性
    console.log('move')
  }
  protected pro() {
    //  当前类 和子类 可见
    console.log('pro')
  }
  private privatetest() {
    //  类的私有属性 仅自己内部可见
    console.log('private')
  }
  readonly readonlytest: number // 只读 默认值允许 // 只能在constructor 中修改
  constructor(readonlytest: number) {
    this.readonlytest = 10
  }
}

class Dog extends Amila {
  action() {
    console.log('action')
  }
}

const tags = new Dog(12) //  实例对象 有的属性就不可访问

// 类的公开  可以任意访问
interface red {
  readonly name: string
}
let obs: red = {
  name: '2222'
}
obs.name = '22' //  err  不可被修改

//=================================================
//  类的兼容性
// 结构类型完全相同的类型可以 兼容
// 对象类型的兼容性
// 接口之间的兼容性
interface pop1 {
  x: number
  y: number
}
interface pop2d {
  x: number
  y: number
}

let p1: pop1
let p2: pop2d

class por3 {
  x: number
  y: number
  z: number
  d: number
}

//  类和接口之间兼容  成员多的可以赋值给成员少的

// 泛型
//  保证类型安全  多种类型一起工作
