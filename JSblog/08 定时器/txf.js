/**
 * Created by Administrator on 2017/8/9.
 */
function  getStyle(obj,attr) {
    return  obj.currentStyle ?  obj.currentStyle[attr] :  getComputedStyle(obj)[attr];
}
function getId(id) {
    return document.getElementById(id);
}

function move(obj,tag,stopValue,attr,fun) {
    tag = stopValue > parseInt(getStyle(obj, attr)) ? tag : -tag;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var speed = parseInt(getStyle(obj, attr)) + tag;
        if (speed <= stopValue && tag < 0 || speed >= stopValue && tag > 0) {
            speed = stopValue;
        }
        obj.style[attr] = speed + "px";
        if (speed == stopValue) {
            clearInterval(obj.timer);
            //有回调函数调用
            fun && fun();
        }
    }, 30);

}