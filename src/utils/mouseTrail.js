function ApplyStyle(element, styleObj) {
  Object.assign(element.style, styleObj);
}

export default {
  install(Vue) {
    const colors = [
      "#FFA07A", // 浅鲑鱼色
      "#FFDEAD", // 浅杏色
      "#FFFFE0", // 浅黄色
      "#ADFF2F", // 绿黄色
      "#ADD8E6", // 浅蓝色
      "#9370DB", // 中紫色
      "#FFB6C1", // 浅粉红色
      "#87CEFA", // 浅天蓝色
      "#98FB98", // 浅绿色
      "#FFDAB9", // 桃色
      "#DDA0DD", // 李子色
      "#E6E6FA", // 薰衣草色
    ];

    const characters = ["✺", "❆", "❄", "❄", "❄", "✺", "❉", "✹", "✵", "❁", "❆"];
    const elementGroup = [];

    class Element {
      constructor() {
        const num = Math.floor(Math.random() * characters.length);
        this.character = characters[num];
        this.lifeSpan = 120;
        this.initialStyles = {
          position: "fixed",
          top: "0",
          display: "block",
          pointerEvents: "none",
          "z-index": "10000000",
          fontSize: "25px",
          "will-change": "transform",
          color: "#000000",
        };

        this.init = function (x, y, color) {
          this.velocity = {
            x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
            y: 1,
          };
          this.position = { x: x - 10, y: y - 20 };
          this.initialStyles.color = color;
          this.element = document.createElement("span");
          this.element.innerHTML = this.character;
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

    function onMouseMove(t) {
      const num = Math.floor(Math.random() * colors.length);
      CreateElement(t.clientX, t.clientY, colors[num]);
    }

    function CreateElement(x, y, color) {
      const e = new Element();
      e.init(x, y, color);
      elementGroup.push(e);
    }

    Vue.prototype.$mouseTrail = mouseTrail;
    Vue.prototype.$Rander = Rander;
  },
};
