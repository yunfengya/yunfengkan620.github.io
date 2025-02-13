function ApplyStyle(element, styleObj) {
  Object.assign(element.style, styleObj);
}

export default {
  install(Vue) {
    const images = [
      require("../assets/小蜜蜂.gif"),
      // require("../assets/lunbo.png"),
      // require("../assets/lunbo2.png"),
      // require("../assets/lunbo3.png"),
      // require("../assets/lunbo4.png"),
      // require("../assets/lunbo5.png"),
      // add more image URLs as needed
    ];
    const elementGroup = [];

    class Element {
      constructor() {
        this.lifeSpan = 120;
        this.initialStyles = {
          position: "fixed",
          top: "0",
          display: "block",
          pointerEvents: "none",
          "z-index": "10000000",
          "will-change": "transform",
        };

        this.init = function (x, y, imageSrc) {
          this.velocity = {
            x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
            y: 1,
          };
          this.position = { x: x - 10, y: y - 20 };
          this.element = document.createElement("img");
          this.element.src = imageSrc;
          this.element.style.width = "20px"; // Set the image width
          this.element.style.height = "20px"; // Set the image height
          ApplyStyle(this.element, this.initialStyles);
          this.update();
          document.body.appendChild(this.element);
        };

        this.update = function () {
          this.position.x += this.velocity.x;
          this.position.y += this.velocity.y;
          this.lifeSpan--;
          this.element.style.transform =
            "translate3d(" +
            this.position.x +
            "px," +
            this.position.y +
            "px,0) scale(" +
            this.lifeSpan / 120 +
            ")";
        };

        this.die = function () {
          this.element.parentNode.removeChild(this.element);
        };
      }
    }

    function Rander() {
      for (let i = 0; i < elementGroup.length; i++) {
        elementGroup[i].update();
        if (elementGroup[i].lifeSpan < 0) {
          elementGroup[i].die();
          elementGroup.splice(i, 1);
        }
      }
      requestAnimationFrame(Rander);
    }

    function mouseTrail() {
      document.addEventListener("mousemove", onMouseMove);
    }
    // 添加一个计数器 控制拖尾出现频率
    let moveCounter = 0;
    function onMouseMove(t) {
      moveCounter++;
      if (moveCounter > 3){
        const imageSrc = images[Math.floor(Math.random() * images.length)];
        CreateElement(t.clientX, t.clientY, imageSrc);
        moveCounter = 0;  // 重置计数器
      }
    }

    function CreateElement(x, y, imageSrc) {
      const e = new Element();
      e.init(x, y, imageSrc);
      elementGroup.push(e);
    }

    Vue.prototype.$mouseTrail = mouseTrail;
    Vue.prototype.$Rander = Rander;
  },
};
