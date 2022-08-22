/**
 * Created by Administrator on 2017/8/24.
 */

function Drag(id) {
    console.log(this);
    this.oDiv = document.getElementById(id);
    this.disX = 0;
    this.disY = 0;
    var _this = this;
    //按下 { }
    // this.oDiv.onmousedown = _this.funDown;
    this.oDiv.onmousedown = function (ev) {
        // alert(this);
        _this.funDown(ev);
    }
}
Drag.prototype.funDown = function (ev) {
        console.log(this);
        var _this = this;
        var ev = window.event || ev;
        this.disX = ev.clientX - this.oDiv.offsetLeft;
        this.disY = ev.clientY - this.oDiv.offsetTop;
        document.onmousemove = function () {
            console.log(this);  //
            _this.funMove(ev);
        };
        document.onmouseup = this.funUp;
        return false;
};

Drag.prototype.funMove = function (ev) {
    var ev = window.event || ev;
    var l = ev.clientX -this.disX;
    var t = ev.clientY - this.disY;
    this.oDiv.style.left = l + "px";
    this.oDiv.style.top = t + "px";

};
Drag.prototype.funUp = function () {
    document.onmouseup = document.onmousemove = "";
};