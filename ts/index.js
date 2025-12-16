var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var a = 'sd';
var arr1 = [];
arr1[3] = 'sdsd'; // 报错
var arr2 = [];
var arr3 = []; // 联合类型
arr3 = [2, '3', 33, false]; // 后面不符合类型的会报错
var ads = ['2', 3, 'ssss', false]; // 后面的会报错
var ads2 = ['2', 3];
//=====================================
//  函数类型 参数 返回值
// 单独指定
function sum(num1, num2) {
    return num1 + num2;
}
sum(1, 2);
sum(2, 'w'); // error
// 指定返回值
function sum2(num1, num2) {
    return num1 + num2;
}
sum2(1, 2);
sum2(2, 'w'); // error
// 指定返回值
var add1 = function (num1, num2) {
    return num1 + num2;
};
//  同时指定参数喝返回值
//  值适用于函数表达式
// 类似于箭头函数  :(num1: number, num2: number )=> number
//  后面的函数不在需要指定了
var add2 = function (num1, num2) {
    return num1 + num2;
};
// 函数没有返回值 默认 :void
function voildTest() {
    console.log('没有返回值');
}
// 函数可选参数 参数后面加  ？   可选参数后面不能出现必传参数
function mysclic(str1, str2) {
    console.log(str1);
    console.log(str2, ' 可选参数');
}
mysclic('1', '2');
mysclic('1');
// 不换行用 分号 ； 换行了 不用分号
//  不可与 json  d队形混淆
var json1 = {
    name: 'sds',
    age: 19,
    say: function () {
        console.log('say');
    }
};
var json2 = {
    name: 'sds',
    age: 19,
    say: function () {
        console.log('say');
    }
};
// 接口使用
var json3 = {
    // aa: "sd"  // 报错
    name: 'sds',
    age: 19,
    say: function () { }
};
var extends2 = {
    // 通过继承 同时拥有2和 3
    //sss: 'sss' // error
    file1: '232',
    add: function () {
        console.log('aa');
    }
};
//======================================
// 元组 类型
//  严谨写法  规定确定知道 包含多少个 ，以及特性和类型
//  使用标记类型
var flog = [1, '22'];
// 类型推论
var int = 14;
var str = 'sss';
int = 'ss'; // error
//  省略函数返回值的时候 返回number
function intadd(num1, num2) {
    return num1 + num2;
}
// 能省略类型注解的 尽量省略   利用ts  自生 的推论
// 类型断言  通过 关键字 as
var aLink = document.getElementById('id');
var aLink2 = document.getElementById('id');
// 这样就可以获取到 a 标签的属性 aLink2.href    react 中会用到
// 字面量类型
var str1 = 'Hellow  TS ';
var str2 = 'Hellow TS ';
// 出现两种类型不一样的情况  常量 和变量
var age = 18;
age = 19; // error
// 用途  用于表示一组明确的数
function exper(action) {
    console.log('action ', action);
}
exper('ss'); //error
exper('up'); //suess
function exper2(action) {
    console.log('action ', action);
}
exper2('right');
// 枚举类型 enum
// 需改上面的 type
var Action;
(function (Action) {
    Action[Action["up"] = 0] = "up";
    Action[Action["down"] = 1] = "down";
    Action[Action["right"] = 2] = "right";
    Action[Action["left"] = 3] = "left";
})(Action || (Action = {}));
function exper3(action) {
    console.log('action ', action);
}
exper3(Action.down); // 类似于对像的 取值
//枚举成员的值  和 数字枚举
var Action2;
(function (Action2) {
    Action2[Action2["up"] = 10] = "up";
    Action2[Action2["down"] = 11] = "down";
    Action2[Action2["right"] = 12] = "right";
    Action2[Action2["left"] = 13] = "left";
})(Action2 || (Action2 = {}));
//
var Action3;
(function (Action3) {
    Action3["up"] = "up";
    Action3["down"] = "down";
})(Action3 || (Action3 = {}));
// 枚举的特性  不仅是类型 还提供了值  会被编译成js
var anyp = '2222';
anyp = 32;
// any  任意类型  尽量少用  或者临时使用
// 隐式 具有 any  类型
// 申明变量  没有初始值
// 申明函数 参数 没有指定类型
//=====================================
console.log(typeof 'hello TS ');
// typeof 与js 不同点 可以直接获取类型
var ptype = {
    // 省略了注解
    x: 1,
    y: '2'
};
function fontType(point) {
    // 当前参数就为对象类型
    console.log(point);
}
// fontType('sss')
fontType({ x: 1, y: '22222' }); // 来自ptype 的数据
//===================高级类型==================
var Person = /** @class */ (function () {
    function Person() {
        this.age = 12;
        this.name = 'wangpeng ';
    }
    return Person;
}());
var peop = new Person();
console.log(peop.name);
//  构造函数
var Car = /** @class */ (function () {
    function Car(age, name) {
        this.age = age;
        this.name = name;
    }
    return Car;
}());
var Dcar = new Car(19, 'dycar');
// const Dcar2 = new Car('sd', 'dycar') // 报错
//实例 对象方法
var porit = /** @class */ (function () {
    function porit() {
    }
    porit.prototype.sclic = function (n) {
        this.x *= n;
        this.y *= n;
    };
    return porit;
}());
var peopr = new porit();
// class 继承和 extends
var child = /** @class */ (function (_super) {
    __extends(child, _super);
    function child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    child.prototype.showChild = function () {
        console.log();
    };
    return child;
}(porit));
var newChild = new child(); //  可以调用各种方法
var apple = /** @class */ (function () {
    function apple() {
    }
    apple.prototype.sing = function () { };
    return apple;
}());
//  目的 为类 添加约束
// class  成员的可见性   public  protected   private  readonly
var Amila = /** @class */ (function () {
    function Amila(readonlytest) {
        this.readonlytest = 10;
    }
    Amila.prototype.move = function () {
        //  默认的公开属性
        console.log('move');
    };
    Amila.prototype.pro = function () {
        //  当前类 和子类 可见
        console.log('pro');
    };
    Amila.prototype.privatetest = function () {
        //  类的私有属性 仅自己内部可见
        console.log('private');
    };
    return Amila;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.action = function () {
        console.log('action');
    };
    return Dog;
}(Amila));
var tags = new Dog(12); //  实例对象 有的属性就不可访问
var obs = {
    name: '2222'
};
obs.name = '22'; //  err  不可被修改
var p1;
var p2;
var por3 = /** @class */ (function () {
    function por3() {
    }
    return por3;
}());
//  类和接口之间兼容  成员多的可以赋值给成员少的
// 泛型
//  保证类型安全  多种类型一起工作
