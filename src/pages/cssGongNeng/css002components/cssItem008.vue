<template>
    <div class="contain_box">
        <!-- page start -->
        <div class="out_box">
            <h1>请选择关注类型</h1>
            <div class="box_carts">
                <!-- 复选框 item start -->
                <div :class="{ 'box_cart_item': true, 'box_cart_itemCheck': i.isCheck, 'box_cart_itemDisable': i.disable }"
                    v-for="(i, index) in list" :key="index" @click="doCheck(i)">
                    <img :src="i.icon" />
                    <span class="span-bar">
                        <p class="label-bar">{{ i.label }}</p>
                        <p class="desc-bar">{{ i.desc }}</p>
                    </span>
                    <!-- 选中标识 start -->
                    <span v-if="i.isCheck" class="icon-check">
                    </span>
                    <!-- 选中标识 end -->
                </div>
                <!-- 复选框 item end -->
            </div>
            <p style="font-size:12px;color:#333">当前选择ids：{{ this.checked.join(',') }}</p>
        </div>
        <!-- page end -->
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            checked: ['1', '2'],
            list: [
                {
                    label: 'JYM系统消息',
                    id: '1',
                    desc: '关注掘金系统消息',
                    isCheck: true,
                    icon: 'https://gd-hbimg.huaban.com/6f3e3ff111c6c98be6785d9eddd5b13f8979ef9d1719e-Xwo8QB_fw658webp',
                    disable: true,
                }, {
                    label: 'JYM后端',
                    id: '2',
                    isCheck: true,
                    desc: '关注后端讨论区新消息',
                    icon: 'https://gd-hbimg.huaban.com/e2622fe339d655bd17de59fed3b0ae0afb9a16c31db25-YNpnGV_fw658webp',
                    disable: false,
                }, {
                    label: 'JYM前端',
                    id: '3',
                    isCheck: false,
                    desc: '关注前端讨论区新消息',
                    icon: 'https://gd-hbimg.huaban.com/80765200aa4ffb7683ddea51c3063b0801874fb86324-3OVCQN_fw1200',
                    disable: false,
                },
                {
                    label: 'JYM开发工具',
                    id: '4',
                    isCheck: false,
                    desc: '关注开发工具讨论区新消息',
                    icon: 'https://gd-hbimg.huaban.com/ef1c0e1fb2eae73d674aae791526a331b45b26d2b78e-r4p1aq_fw1200',
                    disable: false,
                }
            ]
        };
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
        /**
     * 复选点击事件 
     * el.disable 禁用状态
     * */
        doCheck(el) {
            if (el.disable) return
            if (this.checked.includes(el.id)) {
                el.isCheck = false
                this.checked = this.checked.filter(item => item !== el.id);
            } else {
                el.isCheck = true
                this.checked.push(el.id)
            }
            this.checked.join(',')
        }
    }
};
</script>

<style scoped lang="scss">
/* 容器样式 */
.contain_box {
    width: 100%;
    height: 100%;
    /* 视口的高度减去顶部的导航栏高度 */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    /* 外框样式 */

    /* 外框样式 */
    .out_box {
        padding: 20px;
        h1 {
            font-size: 16px;
        }
        // 个性化复选框 css start -------------
        .box_carts {
            width: 100%;
            $primary-color: #1e80ff; // 主题色-掘金蓝
            $primary-disable: #7ab0fd; // 只读或禁用色
            // 选中状态css
            .box_cart_itemCheck {
                border: 1px solid $primary-color !important;
                background: rgba($primary-color, 0.05) !important;
            }
            // 禁用状态css
            .box_cart_itemDisable {
                border: 1px solid #d3d3d3 !important;
                background: #f3f3f3 !important;
                cursor: not-allowed !important;

                .icon-check {
                    border-top: 20px solid #ccc !important;
                }

                .label-bar {
                    color: #777 !important;
                }

                .desc-bar {
                    color: #a3a3a3 !important;
                }
            }
            // 常规状态css
            .box_cart_item {
                position: relative;
                display: inline-flex;
                align-items: center;
                width: 220px;
                height: 70px;
                border: 1px solid #ccc;
                cursor: pointer;
                margin: 0px 8px 8px 0px;
                border-radius: 4px;
                overflow: hidden;

                &:hover {
                    border: 1px solid $primary-color;
                    background: rgba($primary-color, 0.05);
                }

                img {
                    width: 38px;
                    height: 38px;
                    margin-left: 15px;
                }

                p {
                    margin: 0px;
                }
                .span-bar {
                    width: 0px;
                    flex: 1 0 auto;
                    padding: 0px 10px;

                    .label-bar {
                        font-size: 14px;
                        font-weight: 700;
                        margin-bottom: 4px;
                        color: #333;
                    }

                    .desc-bar {
                        font-size: 12px;
                        color: #999;
                    }
                }
                // 绘制圆角斜三角形
                .icon-check {
                    position: absolute;
                    width: 0px;
                    height: 0px;
                    top: 2px;
                    right: 2px;
                    border-top: 20px solid $primary-color;
                    border-left: 25px solid transparent;
                    border-radius: 5px 3px 5px 0px;

                    &:after {
                        content: '✓';
                        position: relative;
                        color: #fff;
                        font-size: 12px;
                        left: -12px;
                        top: -26px;
                    }
                }
            }
        }
        // 个性化复选框 css end -------------
    }
}</style>
