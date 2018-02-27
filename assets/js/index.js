/**
 * 匀速动画函数
 * @param {需要移动的元素} element 
 * @param {需要移动的距离} target 
 * @param {移动的速度} num 
 */
// function animate(element, target, num) {
//     clearInterval(element.timer);
//     element.timer = setInterval(function () {
//         var leader = element.offsetLeft;
//         var step = target > leader ? num : -num;
//         if (Math.abs(target - leader) >= Math.abs(step)) {
//             leader += step;
//             element.style.left = leader + 'px';
//         } else {
//             clearInterval(element.timer);
//             element.style.left = target + 'px';
//         }
//     }, 15);
// }

/**
 * 缓动动画函数
 * @param {需要移动的元素} element 
 * @param {需要移动的距离} target 
 * @param {移动的速度(越小越快)} num 
 */
function animate(element, target, num) {
    // 一进来就要清除定时器，防止越点越快
    clearInterval(element.timer);
    element.timer = setInterval(function() {
        // 获得元素当前位置
        var leader = element.offsetLeft;
        // 定义每次运动的距离
        var step = (target - leader) / num;
        //如果step是正数，对step向上取整，如果step是负数，对step向下取整
        // 保证每一次最少都走1px
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        // 设置元素的位置
        element.style.left = leader + 'px';
        // 当元素的位置 等于 目标位置的时候 清除定时器
        if (leader == target) {
            clearInterval(element.timer);
        }
    }, 15);
}   

// 开始
var banner = document.getElementById('banner');
var imgUl = banner.children[0];
var imgLis = imgUl.children;
var circle = document.getElementById('circle');
var circleLis = circle.children;
// 获取显示图片的宽度
var imgWidth = banner.offsetWidth;
// 动态设置banner的高度,保证背景图按比例完整显示
var bannerH = imgWidth / 3.2;
banner.style.height = bannerH + "px";

var timer = null;
// 跑出去的张数
var count = 0; 

/** 
*自动轮播函数 
*/
function autoPlay() {
    // 当这个张数等于最后一张的时候,把最后一张图片换成第一张
    if (count == imgLis.length - 1) {
        count = 0;
        imgUl.style.left = 0;
    }
    // 函数调用一次跑出去的张数自增一次
    count++;
    var target = -count * imgWidth;
    animate(imgUl, target, 20);

    //让小圆点跟着动 只要将 count 与小圆点绑定即可
    for (var i = 0; i < circleLis.length; i++) {
        circleLis[i].className = "";
    }
    // 当count == 最后一张图片的下标的时候，直接让第一个小圆点亮
    if (count == imgLis.length - 1) {
        circleLis[0].className = "current";
    } else {
        // 否则其他的下标对应的小圆点高亮
        circleLis[count].className = "current";
    }
}

// 定时器开启自动轮播
timer = setInterval(function() {
    autoPlay();
}, 3500);

// 点击小圆点改变对应图片
for (var i = 0; i < circleLis.length; i++) {
    circleLis[i].index = i;
    circleLis[i].onclick = function () {
        // 小圆点点击的时候高亮排他
        for (var i = 0; i < circleLis.length; i++) {
            circleLis[i].className = "";
        }   
        this.className = "current";
        if (count == imgLis.length - 1) {
            count = 0;
            imgUl.style.left = 0;
        }
        // 点击小圆点图片要移动
        var target = -this.index * imgWidth;
        count = this.index;
        animate(imgUl, target, 10);
    }
}

// 当鼠标进入小圆点区域的时候,停止自动轮播
circle.onmouseover = function(){
    clearInterval(timer);
}
// 当鼠标离区域的时候,开启自动轮播
circle.onmouseout = function(){
    timer = setInterval(function() {
        autoPlay();
    }, 3500);
}


