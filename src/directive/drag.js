/**
* v-dialogDrag 弹窗拖拽
* Copyright (c) 2019 ruoyi
*/

export default {
  bind(el, binding, vnode, oldVnode) {
    // let oDiv = el.querySelector('.voiceIcon');
    let oDiv = el
 // 禁止选择网页上的文字
 document.onselectstart = function () {
    // return false
    return true
 }
    // 鼠标按下事件
    oDiv.onmousedown = (event) => {
      event.preventDefault();
      // 鼠标按下，计算当前元素距离可视区的距离 (鼠标点击位置距离可视窗口的距离)
      const disX = event.clientX - oDiv.offsetLeft;
      const disY = event.clientY - oDiv.offsetTop;


      // 鼠标拖拽事件
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离 （开始拖拽至结束拖拽的距离）
        const l = e.clientX - disX;
        const t = e.clientY - disY;



        // 移动当前元素
        oDiv.style.left = `${l}px`;
        oDiv.style.top = `${t}px`;

      };

      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
      return false
    }
  }
};
