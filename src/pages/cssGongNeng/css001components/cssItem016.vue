<template>
    <div class="contain_box">
        <div class="lottery__list">
        <div class="lottery__item" v-for="(item,index) in 10" :key="index">
            <div class="inner">
                <span>奖品{{item}}</span>
            </div>
        </div>
        <div ref="pointer" class="pointer" @click="handleLottery">开始抽奖</div>
    </div>
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            lottery: 0, // 本次抽奖的奖品索引
            lastLottery: 0, // 上一次抽奖的奖品索引
            stopDeg: 0, // 最终要旋转的角度
            loading: false
        };
    },
    mounted() {
        this.$refs.pointer.addEventListener('transitionend', this.handleTransitionEnd);
    },
    beforeDestroy() {
        this.$refs.pointer.removeEventListener('transitionend', this.handleTransitionEnd);
    },
    methods: {
        handleLottery() {
            if (this.loading) return;
            this.loading = true;
            // 最终获得的奖品索引，实际业务中是通过接口获取的，这里使用随机数0~9来模拟下
            this.lottery = Math.floor(Math.random() * 10);
            console.log(this.lottery);
            // 最终的旋转角度，指针指向本次奖品的旋转角度+指针从上一次的奖品指向回归0的旋转角度+ 默认转动三圈
            this.stopDeg += (this.lottery + (10 - this.lastLottery)) * 36 + 1080;
            // 旋转
            this.$refs.pointer.style.transform = `rotate(${this.stopDeg}deg)`;
        },
        handleTransitionEnd() {
            // alert(`恭喜获得奖品${this.lottery + 1}`);
            console.log(`恭喜获得奖品${this.lottery + 1}`);
            // 保留奖品索引
            this.lastLottery = this.lottery;
            this.loading = false;
        }
    }
};
</script>

<style scoped lang="scss">
/* 容器样式 */
.contain_box {
    width: 100%;
    height: calc(100vh - 4.2rem);
    /* 视口的高度减去顶部的导航栏高度 */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    /* 外框样式 */
    .lottery__list {
        position: relative;
        width: 200px;
        height: 200px;
        border: 2px solid #ff5555;
        border-radius: 50%;
    }

    .lottery__item {
        position: absolute;
        top: 0;
        left: 100px;
        width: 100px;
        height: 200px;
        overflow: hidden;
        transform-origin: left center;
    }

    .inner {
        position: absolute;
        top: 0;
        left: -100px;
        width: 100px;
        height: 200px;
        padding: 5px 3px 0 57px;
        border-radius: 100px 0 0 100px;
        transform: rotate(36deg);
        transform-origin: right center;
        font-size: 12px;
        box-sizing: border-box;
    }

    .inner span {
        display: block;
        transform-origin: center;
        transform: rotate(-19deg);
    }

    .lottery__item:nth-child(2n+1) .inner {
        background: #fef6e0;
    }

    .lottery__item:nth-child(2n) .inner {
        background: #ffffff;
    }

    .lottery__item:nth-child(1) {
        display: block;
        transform: rotate(-18deg);
    }

    .lottery__item:nth-child(2) {
        transform: rotate(18deg);
    }

    .lottery__item:nth-child(3) {
        transform: rotate(54deg);
    }

    .lottery__item:nth-child(4) {
        transform: rotate(90deg);
    }

    .lottery__item:nth-child(5) {
        transform: rotate(126deg);
    }

    .lottery__item:nth-child(6) {
        transform: rotate(162deg);
    }

    .lottery__item:nth-child(7) {
        transform: rotate(198deg);
    }

    .lottery__item:nth-child(8) {
        transform: rotate(234deg);
    }

    .lottery__item:nth-child(9) {
        transform: rotate(270deg);
    }

    .lottery__item:nth-child(10) {
        transform: rotate(306deg);
    }

    .pointer {
        position: absolute;
        left: 79px;
        top: 79px;
        width: 30px;
        height: 30px;
        padding: 6px;
        background-color: #ff5350;
        border: 1px solid #ff5350;
        border-radius: 50%;
        transition: transform 3s cubic-bezier(.2, .93, .43, 1);
        line-height: 15px;
        font-size: 12px;
        text-align: center;
    }

    .pointer::after {
        content: '';
        position: absolute;
        left: 14px;
        top: -24px;
        border-width: 12px 6px;
        border-style: solid;
        border-color: transparent;
        border-bottom-color: #ff5350;
        transform-origin: center;
    }
}

</style>
