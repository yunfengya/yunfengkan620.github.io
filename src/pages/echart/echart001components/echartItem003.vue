<template>
    <div class="contain_box">
        <div 
            class="echartsOne" 
            ref="echartsPie1"
            style="width:90%;height:80%;border:1px solid gray;backgroundColor:#4e6ca3;"
        ></div>
    </div>
</template>
<script>
export default {
    name: "index",
    components: {},
    data() {
        return {
            // 遮罩层
            loading: true,
        };
    },
    mounted() {
        this.myChartPie1()
    },
    watch: {},
    created() { },
    methods: {
        myChartPie1() {

            let dataList = [
                { value: 2154, name: '小名', sex: '男' },
                // { value: 3854, name: '小李', sex: '女' }
            ]
            let option={
                legend: {
                    type: "scroll",
                    pageTextStyle: {
                        color: "#fff",
                    },
                    pageIconColor: "#04ffff",
                    pageIconInactiveColor: "#ccc", //到页头的颜色
                    textStyle: {
                    //图例文字的样式
                    color: "#fff",
                        fontSize: 14,
                    },
                    itemWidth: 8,
                    itemHeight: 8,
                    padding: [8, 8, 0, 0],
                    // icon: "circle",
                },
                grid: {
                    top: "8%",
                    bottom: "4%",
                    right: "2%",
                    left: "4%",
                    containLabel: true,
                },
                tooltip: {
                    trigger: "item",
                    // formatter: "{b}\n{c}台",
                    backgroundColor: "rgba(3, 20, 64,1)",

                    borderWidth: "1",
                    borderColor: "#004EA8",
                    textStyle: {
                        color: "#fff",
                        fontSize: 14,
                    },
                },
                xAxis: {
                    type: 'category',
                    nameTextStyle: {
                        fontSize: 14,
                    },
                    axisLabel: {
                        show: true,
                        color: "#17E1FF",
                        fontSize: 14,
                        interval: 0,
                        fontFamily: "Microsoft YaHei",
                        rotate: 0, // 设置 x 轴文字旋转角度为 45 度
                        // align: 'center' // 设置 x 轴文字水平居中
                        // formatter: (params) => {
                        //   let [name, station_name] = params.split('/')
                        //   return name || ''
                        // },
                    },
                    boundaryGap: true, //图左右位置是否在刻度线上 还是在两刻度之间 坐标轴两边是否留白
                    axisTick: {
                        alignWithLabel: true, //让图表在刻度线的刻度上
                        show: false, // 不显示坐标轴刻度线
                        length: 5,
                        lineStyle: {
                            color: "#13bedf", //x轴刻度线颜色
                            width: 2,
                        },
                    },
                    axisLine: {
                    lineStyle: {
                        color: "#13bedf",
                        type: "solid",
                    },
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            type: "dashed",
                        },
                    },
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',]
                },
                yAxis: {
                    type: 'value',
                    name: "单位:min",
                    nameLocation: "end", // x轴name处于x轴的什么位置
                    nameTextStyle: {
                        // x轴name的样式调整
                        color: "#17E1FF",
                        fontSize: 12,
                        padding: [0,40,0,30,], // 加上padding可以调整其位置
                    },
                    min: 0,
                    // max:60,
                    axisLabel: {
                        show: true, //不显示y轴
                        color: "#17E1FF",
                        fontSize: 12,
                        fontFamily: "Microsoft YaHei",
                        formatter: "{value}",
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: true, //不显示分割线
                        lineStyle: {
                            type: "dashed",
                            color: "rgba(23, 225, 255, 0.4)",
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#17E1FF",
                            type: "solid",
                        },
                    },
                },
                series: [
                    {
                        name: '系列1',
                        type: 'bar',
                        stack: 'total',//同名则堆叠
                        data: [120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230,],
                        barMaxWidth: 36,// 柱状图最大宽度 宽度自适应变化
                        label: {
                            show: true,
                            color: "#fff",
                            position: "inside", // inside insideTop
                            fontSize: 14,
                            // align: 'center',
                            // formatter: "{c}%",
                            //顶部文字的颜色 根据顶部数据的大小，判定设置不同的颜色
                            // formatter: function (params) {
                            //     if (params.seriesName == "宕机") {
                            //         return params.data;
                            //     } else {
                            //         return "";
                            //     }
                            // },
                        },
                        itemStyle: {
                            color: function(params) {
                                // params.dataIndex 当前数据索引
                                // params.seriesIndex 当前系列索引
                                // params.value 当前值
                                
                                // 根据值动态返回颜色
                                if (params.value > 200) {
                                    return '#c23531'; // 红色
                                } else if (params.value > 100) {
                                    return '#2f4554'; // 深蓝色
                                } else {
                                    return '#61a0a8'; // 浅蓝色
                                }
                            }
                        }
                    },
                    {
                        name: '系列2',
                        type: 'bar',
                        stack: 'total',
                        data: [220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, ],
                        barMaxWidth: 136,
                        label: {
                            show: true,
                            color: "#fff",
                            position: "inside", // inside insideTop
                            fontSize: 14,
                            // align: 'center',
                            // formatter: "{c}%",
                            //顶部文字的颜色 根据顶部数据的大小，判定设置不同的颜色
                            // formatter: function (params) {
                            //     if (params.seriesName == "宕机") {
                            //         return params.data;
                            //     } else {
                            //         return "";
                            //     }
                            // },
                        },
                        itemStyle: {
                            color: function(params) {
                                // 为第二个系列设置不同的颜色逻辑
                                return params.value > 300 ? '#d48265' : '#91c7ae';
                            }
                        }
                    }
                ],
                dataZoom: [
                    {
                        type: 'slider',
                        xAxisIndex: 0,
                        startValue: 0, // 从头开始。
                        endValue: 6, // 一次性展示几个
                        backgroundColor: "transparent", // 滑块轨道的颜色
                        borderColor: "transparent", // 滑块轨道边框的颜色
                        moveHandleSize: 1, //移动手柄的尺寸高度。
                        textStyle: {
                            color: "rgba(1,1,1,0)",
                        },
                        // show: allList.length>6?true:false,//通过数据的条数 控制是否显示滚动条
                        height: 14,
                        bottom: "1%",
                    },
                    {
                        type: 'inside',
                        xAxisIndex: 0,
                        show: true,
                        zoomOnMouseWheel: true, // 缩放
                        moveOnMouseMove: true,   // 开启拖动
                        moveOnMouseWheel: true,
                        // fillerColor: 'rgba(1,1,1,0)', //滑块的颜色
                        backgroundColor: "transparent", // 滑块轨道的颜色
                        borderColor: "transparent", // 滑块轨道边框的颜色
                        moveHandleSize: 1, //移动手柄的尺寸高度。
                        textStyle: {
                            color: "rgba(1,1,1,0)",
                        },
                        // show: allList.length>6?true:false,//通过数据的条数 控制是否显示滚动条
                        height: 14,
                        bottom: "1%",
                        // start: 0,
                        // end: 100,
                        startValue: 0, // 从头开始。
                        endValue: 6, // 一次性展示几个
                    },
                ],
            }

            let newOption = {};
            if (dataList.length) {
                newOption = option;
            } else {
                newOption = {
                    title: {
                        text: "暂无数据",
                        x: "center",
                        y: "center",
                        textStyle: {
                            color: "#8994a1",
                            fontWeight: "normal",
                            fontSize: this.setFontSize(18),
                        },
                    },
                };
            }

            let myChartPie = this.$echarts.getInstanceByDom(
                this.$refs.echartsPie1
            );
            if (myChartPie === undefined) {
                myChartPie = this.$echarts.init(this.$refs.echartsPie1);
            }
            
            // myChartPie.off("click");
            // myChartPie.on("click", (params) => {
            //     console.log(params);
            // });

            myChartPie.setOption(newOption);
            const chartObserver = new ResizeObserver(() => {
                myChartPie.setOption(newOption, true);
                myChartPie.resize();
            });
            chartObserver.observe(this.$refs.echartsPie1);
        },
    },
};
</script>
  
<style scoped lang="scss">
.contain_box {
    width: 100%;
    // height: 100%;
    height: calc(100% - 4.2rem);
    overflow: auto;
    // background: url("@/assets/bgc.jpg") no-repeat;
    // background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>