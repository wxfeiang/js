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



function addClassName(obj,className) {
    //null  ""
    if(obj.className == ""){
        obj.className = className;
    }else {
        //空格  不能重
        var arr = obj.className.split(" ");  //box active
        if(_indexof(arr,className) == -1){
            obj.className += " " + className;
        }
    }
}
function removeClassName(obj,className) {

    var arr = obj.className.split(" ");
    var index = _indexof(arr,className);
    if(index != -1){  //[box,box1]  //box box1
        arr.splice(index,1);
        obj.className = arr.join(" ");
    }
}

function _indexof(arr,s) {
    for(var i = 0; i < arr.length;i++){
        if(arr[i] == s){
            return i;
        }
    }
    return -1;
}

function drag(obj1,obj2) {  //父元素  拖拽的元素
    //按下，拖动
    var obj2 =  arguments.length == 2 ? obj2:obj1;
    obj2.onmousedown = function (ev) {
        var ev = window.event || ev;
        var x = ev.clientX - obj1.offsetLeft;
        var y = ev.clientY - obj1.offsetTop;
        //alert(oDiv.setCapture);
        if(obj2.setCapture){  //undefined
            obj2.setCapture();
        }
        document.onmousemove = function (ev) {
            var ev = window.event || ev;
            var l = ev.clientX - x;
            var t = ev.clientY - y;
            if(l<0){
                l = 0;
            }
            if(l>document.documentElement.clientWidth- obj1.offsetWidth){
                l = document.documentElement.clientWidth - obj1.offsetWidth;
                console.log(l);
            }
            if (t<0){
                t = 0;
            }
            if(t>document.documentElement.clientHeight - obj1.offsetHeight){
                t = document.documentElement.clientHeight - obj1.offsetHeight;
            }
            obj1.style.top = t + "px";
            obj1.style.left = l + "px";
        };
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = "";
            if(obj2.setCapture){
                obj2.releaseCapture();
            }
        };

        return false;
    }
}