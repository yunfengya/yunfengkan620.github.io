<template>
    <div class="contain_box">
        <div class="container">
            <div
                class="carousel"
                ref="carousel"
                @mousedown="onMouseDown"
                @mousemove="onMouseMove"
                @mouseup="onMouseUp">
                <div v-for="(cell, index) in cells" :key="index" class="cell">
                    {{ cell }}
                </div>
            </div>
        </div>

        <div style="display: flex; margin-top: 10px">
            <button style="margin-right: 10px" @click="previous">上一页</button>
            <button @click="next">下一页</button>
        </div>
        <div style="display: flex; margin-top: 10px">
            <button style="margin-right: 10px" @click="add">增加一个</button>
            <button @click="reduce">减少一个</button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      cells: [1, 2, 3, 4, 5],
      total: 5,
      occupyDeg: 0,
      translateZRadius: 0,
      index: 0,
      isMouseDown: false,
      startX: 0,
      currentAngle: 0,
      diffX: 0,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
        this.$nextTick(()=>{
            this.occupyDeg = 360 / this.total;
            // 修改或重新计算旋转半径 * 1.3
            this.translateZRadius = Math.round(
              this.$refs.carousel.offsetWidth / 2 / Math.tan(Math.PI / this.total) * 1.3
            );
            this.cells.forEach((cell, i) => {
              const cells = this.$refs.carousel.querySelectorAll(".cell");
              if (cells[i]) {
                    const cellAngle = this.occupyDeg * i;
                    // rotateY(${cellAngle}deg) 用来 左右按钮 切换 旋转角度的
                    // translateZ(${this.translateZRadius}px) 用来调整远近视角距离的
                    cells[i].style.transform = `rotateY(${cellAngle}deg) translateZ(${this.translateZRadius}px)`;
              }
            });
            this.carouseChange();
            console.log(this.cells);
        })
    },
    carouseChange(angleOutside) {
        const angle = angleOutside || this.occupyDeg * this.index * -1;
        // translateY(30px) 用来调整抬头视角
        this.$refs.carousel.style.transform = `translateY(0px) translateZ(${-this.translateZRadius}px) rotateY(${angle}deg)`;
    },
    next() {
    //   this.index = (this.index + 1) % this.total;
      this.index++;
      this.carouseChange();
    },
    previous() {
    //   this.index = (this.index - 1 + this.total) % this.total;
      this.index--;
      this.carouseChange();
    },
    onMouseDown(event) {
      this.isMouseDown = true;
      this.startX = event.clientX;
      this.currentAngle = this.occupyDeg * this.index * -1;
    },
    onMouseMove(event) {
      if (this.isMouseDown) {
        let currentX = event.clientX;
        this.diffX = currentX - this.startX;
        const angleChange =
          this.diffX * (this.occupyDeg / this.$refs.carousel.offsetWidth);
        this.carouseChange(this.currentAngle + angleChange);
      }
    },
    onMouseUp() {
      if (this.isMouseDown) {
        if (Math.abs(this.diffX) > this.$refs.carousel.offsetWidth / 2) {
          if (this.diffX > 0) {
            // this.index = (this.index - 1 + this.total) % this.total;
            this.index--;
          } else {
            // this.index = (this.index + 1) % this.total;
            this.index++;
          }
          this.carouseChange();
        } else {
          this.carouseChange();
        }
        this.diffX = 0;
        this.isMouseDown = false;
      }
    },
    add() {
        this.total += 1;
        this.cells.push(this.total);
        this.init();
    },
    reduce() {
        // 大于3个才可以减少
      if (this.cells.length > 3) {
        this.total -= 1;
        this.cells.pop();
        this.init();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.contain_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    // background-color: rgb(177, 175, 175);
    .container {
        width: 300px;
        height: 200px;
        position: relative;
        perspective: 1000px;
        .carousel {
            width: 100%;
            height: 100%;
            position: absolute;
            transform-style: preserve-3d;
            transition: transform 1s;
            user-select: none;
            cursor: grab;
            .cell {
                position: absolute;
                width: 100%;
                height: 100%;
                border: 2px solid #000;
                background-color: rgba(255, 255, 255, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 60px;
                font-weight: bold;
            }
        }
    }
}
</style>
