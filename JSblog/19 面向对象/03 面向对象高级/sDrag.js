/**
 * Created by Administrator on 2017/8/24.
 */
// window.onload = function () {
//     new Drag("box");
// }

//在原来基础上，加碰撞

function SDrag(id) {
    Drag.call(this,id);  //构造函数里面的属性和方法

    //在构造函数  this.
}

for(var fun in Drag.prototype){
    console.log(fun);
     SDrag.prototype[fun] = Drag.prototype[fun];
}

//复写funMove
SDrag.prototype.funMove = function (){
    var ev = window.event || ev;
    var l = ev.clientX -this.disX;
    var t = ev.clientY - this.disY;
    if(l < 0){l = 0}
    if(l>document.documentElement.clientWidth-this.oDiv.offsetWidth){
        l = document.documentElement.clientWidth-this.oDiv.offsetWidth;
    }
    if(t<0){t = 0}
    if(t > document.documentElement.clientHeight-this.oDiv.offsetHeight){
        t = document.documentElement.clientHeight-this.oDiv.offsetHeight;
    }
    this.oDiv.style.left = l + "px";
    this.oDiv.style.top = t + "px";
};

