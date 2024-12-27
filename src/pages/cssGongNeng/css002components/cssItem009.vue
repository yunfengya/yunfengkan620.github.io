<template>
    <div class="contain_box">
        <!-- easy demo start -->
        <div class="easy-layout-demo">
            <!-- step start -->
            <div class="easy-step-bar">
                <div :class="{
                        'easy-step-item': true,
                        'easy-step-active': stepActiveIndex == index,
                        'easy-step-done': stepActiveIndex >= index,
                    }" 
                    :style="{
                        '--stepColorR': stepActiveIndex == index ? '#bd0000' : '#f5f5f5',
                        '--stepColorL': stepActiveIndex == index ? '#ff6b21' : '#fff'
                    }" 
                    v-for="(i, index) in stepArr" :key="index">
                    <span class="step-icon">
                        <svg t="1731398852033" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6757" width="16" height="16">
                            <path class="icon-svg"
                                d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m247.9 387.5L464.4 682.9c-12.8 12.8-33.6 12.8-46.4 0l-154-154c-12.8-12.8-12.8-33.6 0-46.4 12.8-12.8 33.6-12.8 46.4 0l130.8 130.8L713.5 341c12.8-12.8 33.6-12.8 46.4 0 12.7 12.8 12.7 33.7 0 46.5z"
                                fill="#cdcdcd" p-id="6758"></path>
                        </svg>
                    </span>
                    <span class="step-info">
                        <h2>{{ i.title }}</h2>
                        <p>{{ i.desc }}</p>
                    </span>
                </div>
            </div>
            <!-- step end -->
            <!-- step start -->
            <div class="easy-step-content">
                <!-- title start -->
                <div class="easy-content-title">
                    <h1>{{ stepData.title }}</h1>
                    <h2>{{ stepData.desc }}</h2>
                </div>
                <!-- title end -->
                <!-- main start -->
                <TransitionGroup class="easy-content-main" name="bounce" tag="ul">
                    <!-- step1 start -->
                    <li key="0" v-if="stepActiveIndex == 0">
                        <p style="width:100%;text-align:center;font-size:40px;color:#e5e5e5;padding-top:40px;">
                            {{ stepData.desc }}</p>
                    </li>
                    <!-- step1 end -->
                    <!-- step2 start -->
                    <li key="1" v-if="stepActiveIndex == 1">
                        <p style="width:100%;text-align:center;font-size:40px;color:#e5e5e5;padding-top:40px;">
                            {{ stepData.desc }}</p>
                    </li>
                    <!-- step2 end -->
                    <!-- step3 start -->
                    <li key="2" v-if="stepActiveIndex == 2">
                        <p style="width:100%;text-align:center;font-size:40px;color:#e5e5e5;padding-top:40px;">
                            {{ stepData.desc }}</p>
                    </li>
                    <!-- step3 end -->
                    <!-- step4 start -->
                    <li key="3" v-if="stepActiveIndex == 3">
                        <p style="width:100%;text-align:center;font-size:40px;color:#e5e5e5;padding-top:40px;">
                            {{ stepData.desc }}</p>
                    </li>
                    <!-- step4 end -->
                </TransitionGroup>
                <!-- main end -->
                <!-- btn start -->
                <div class="easy-content-bottom">
                    <div :class="{ 'step-btn-box': true, 'step-btn-disabled': stepActiveIndex == 0 }" @click="doPrev">上一步
                    </div>
                    <div class="step-btn-box" v-if="stepActiveIndex < stepArr.length - 1" @click="doNext">下一步</div>
                    <div class="step-btn-box" v-if="stepActiveIndex == stepArr.length - 1">完成</div>
                </div>
                <!-- btn end -->
            </div>
            <!-- step end -->
        </div>
        <!-- easy demo end -->
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            stepActiveIndex: 0,
            stepData: {},
            stepArr: [
                {
                    title: 'Step1',
                    desc: '创建产品',
                }, {
                    title: 'Step2',
                    desc: '维护模块',
                }, {
                    title: 'Step3',
                    desc: '维护计划',
                }, {
                    title: 'Step4',
                    desc: '创建发布',
                }
            ]
        };
    },
    mounted() {
        this.getStepData()
    },
    beforeDestroy() {

    },
    methods: {
        // 下一步
        doNext() {
            if (this.stepActiveIndex < this.stepArr.length - 1) {
                this.stepActiveIndex++
                this.getStepData()
            }
        },
        // 上一步
        doPrev() {
            if (this.stepActiveIndex > 0) {
                this.stepActiveIndex--
                this.getStepData()
            }
        },
        // 获取step信息
        getStepData() {
            const obj = this.stepArr[this.stepActiveIndex]
            this.stepData = obj
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
    /* css start */
    .easy-layout-demo {
        display: flex;
        flex-direction: column;
        width: 700px;
        height: 400px;
        margin: auto;

        * {
            flex-shrink: 0;
            box-sizing: border-box;
            font-size: 12px;
        }

        h1,
        h2,
        h3,
        h4,
        p {
            margin: 0px;
        }

        @mixin flexBox($dir: row) {
            display: flex;
            flex-direction: $dir;
            align-items: center;
            justify-content: center;
        }

        // 步骤条css
        .easy-step-bar {
            @include flexBox(row);
            width: 100%;
            height: 58px;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0px 2px 8px rgba(147, 176, 195, 0.2);

            // 已完成状态
            .easy-step-done {
                .icon-svg {
                    fill: #22b471 !important;
                }
            }

            // 当前状态   
            .easy-step-active {
                h2 {
                    color: #fff !important;
                }

                p {
                    color: rgba(255, 255, 255, 0.6) !important;
                }

                .icon-svg {
                    fill: #fff !important;
                }
            }

            .easy-step-item {
                @include flexBox(row);
                width: 0px;
                height: 100%;
                flex-grow: 1;
                margin-left: -40px;
                background:
                    linear-gradient(-135deg, transparent 20px, var(--stepColorR) 20px, var(--stepColorL) 80%, transparent 0) top right,
                    linear-gradient(-45deg, transparent 20px, var(--stepColorR) 20px, var(--stepColorL) 80%, transparent 0) bottom right;
                background-size: 100% 50%;
                background-repeat: no-repeat;

                &:first-child {
                    flex-grow: 1.2 !important;
                    background:
                        linear-gradient(-135deg, transparent 20px, var(--stepColorR) 20px, var(--stepColorL) 100%) top right,
                        linear-gradient(-45deg, transparent 20px, var(--stepColorR) 20px, var(--stepColorL) 100%) bottom right;
                    background-size: 100% 50%;
                    background-repeat: no-repeat;
                }

                &:last-child {
                    background:
                        linear-gradient(-135deg, var(--stepColorR) 20px, var(--stepColorL) 80%, transparent 0) top right,
                        linear-gradient(-45deg, var(--stepColorR) 20px, var(--stepColorL) 80%, transparent 0) bottom right;
                    background-size: 100% 50%;
                    background-repeat: no-repeat;
                }

                .step-icon {
                    width: 30px;
                    height: 30px;
                    margin-right: 5px;
                    @include flexBox(row);
                }

                .step-info {
                    p {
                        color: #999;
                        margin-top: 2px;
                    }
                }
            }
        }

        // 步骤内容 css
        .easy-step-content {
            @include flexBox(column);
            width: 100%;
            height: 0px;
            flex-grow: 1;
            margin-top: 15px;
            border-radius: 8px;
            background: #fff;
            padding: 20px;
            box-shadow: 0px 2px 8px rgba(147, 176, 195, 0.2);

            .easy-content-main {
                position: relative;
                width: 100%;
                height: 0px;
                flex-grow: 1;
                overflow: hidden;
                margin: 20px 0px;
                padding: 0px;
                list-style-type: none;

                li {
                    display: block;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    margin: 0px;
                    padding: 0px;
                    overflow: auto;
                }
            }

            .easy-content-title {
                display: flex;
                flex-direction: column;
                width: 100%;

                h1 {
                    font-size: 16px;
                    color: #d72a0d;
                }

                h2 {
                    font-size: 14px;
                    color: #333;
                    z-index: 3;
                    padding-top: 5px;
                    background: rgba(255, 255, 255, 0.6);
                    margin-top: -10px;
                }
            }

            .easy-content-bottom {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                width: 100%;

                .step-btn-box {
                    cursor: pointer;
                    width: 60px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    border-radius: 3px;
                    color: #fff;
                    margin-left: 15px;
                    background: #d72a0d;
                    transition: 200ms linear;

                    &:hover {
                        background: #eb5e45;
                    }
                }

                .step-btn-disabled {
                    background: #acacac !important;
                    cursor: no-drop !important;
                    pointer-events: none;
                }
            }
        }

        .bounce-enter-active {
            animation: fadeInRight 0.5s;
        }

        .bounce-leave-active {
            animation: fadeOutLeft 0.5s;
        }

        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translate3d(30%, 0, 0);
            }

            to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }

        @keyframes fadeOutLeft {
            from {
                opacity: 1;
            }

            to {
                opacity: 0;
                transform: translate3d(-100%, 0, 0);
            }
        }
    }
}
</style>
