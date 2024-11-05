<template>
    <div class="contain_box">
        <div class="lottery__list">
            <div class="lottery__item" :class="{ 'lottery__item--active': activeIndex === 0 }">1</div>
            <div class="lottery__item" :class="{ 'lottery__item--active': activeIndex === 1 }">2</div>
            <div class="lottery__item" :class="{ 'lottery__item--active': activeIndex === 2 }">3</div>
            <div class="lottery__item" :class="{ 'lottery__item--active': activeIndex === 7 }">8</div>
            <div class="lottery__item btn" @click="handleLottery">抽奖</div>
            <div class="lottery__item" :class="{ 'lottery__item--active': activeIndex === 3 }">4</div>
            <div class="lottery__item" :class="{ 'lottery__item--active': activeIndex === 6 }">7</div>
            <div class="lottery__item" :class="{ 'lottery__item--active': activeIndex === 5 }">6</div>
            <div class="lottery__item" :class="{ 'lottery__item--active': activeIndex === 4 }">5</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            lottery: 0, // 奖品
            step: -1, // 目前转动的步数
            stopStep: 32, // 目标步数，上面我们有提到默认都会转几圈，这里默认转四圈，一圈有八个格子，四圈就是要转动32步
            speed: 200, // 转动速度，我们是通过定时器去实现转动效果的，所以这也就是定时器的执行频率
            timer: null, // 定时器ID
            loading: false
        };
    },
    computed: {
        // 通过目前转动的步数来对8取模得到当前转到的格子索引
        activeIndex() {
            return this.step % 8
        }
    },
    methods: {
        // 点击抽奖之后调用的函数
        handleLottery() {
            this.step = -1 // 这里重置了步数
            if (this.loading) return
            this.loading = true
            // 最终获得的奖品，实际业务中是通过接口获取的，这里使用随机数来模拟下
            this.lottery = Math.floor(Math.random() * 8)
            console.log(this.lottery)
            // 计算总共要转动的步数，转4圈后再转到奖品处
            this.stopStep = this.lottery + 32
            // 执行抽奖函数
            this.runFn()
        },
        runFn() {
            // 抽奖函数
            if (this.step < this.stopStep) {
                this.step++
                this.timer = setTimeout(() => this.runFn(), this.speed)
            } else {
                clearTimeout(this.timer)
                this.loading = false
                console.log('恭喜你获得了奖品' + (this.lottery + 1))
                
            }
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer)
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
        display: flex;
        flex-wrap: wrap;
        width: 184px;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
    }

    .lottery__item {
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
    }

    .lottery__item--active {
        background-color: #00d9ff;
    }

    .btn {
        cursor: pointer;
        background-color: #fa9b0e;
    }
}
</style>
