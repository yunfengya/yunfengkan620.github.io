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
            // colorData 自定义映射颜色 自大到小    不设置color则有默认色
            var colorData=["#ffffff","#e8192f","#d6664d","#B9044E","#f0ba2e","#d3ce2b","#169A7f","#0b6573","#1BB3c8"];
            
            // x坐标
            var xData = ['李1', '元2', '王3', '刘4',];
            // y坐标
            var yData = ['攻', '法', '防',];
            
            let itemStyle_obj_green={
                // borderColor: "#333",
                // borderWidth: 0.5,
                color: "#23cc28"
            }
            let itemStyle_obj_red={
                borderColor: "#333",
                borderWidth: 0.5,
                color: "#d44927"
            }
            let seriesData = [
                // 第一行
                { itemStyle: itemStyle_obj_green , value:[0,0,1] },
                { itemStyle: itemStyle_obj_green , value:[1,0,2] },
                { itemStyle: itemStyle_obj_red , value:[2,0,3] },
                { itemStyle: itemStyle_obj_green , value:[3,0,4] },
                // 第二行
                { itemStyle: itemStyle_obj_green , value:[0,1,11] },
                { itemStyle: itemStyle_obj_green , value:[1,1,12] },
                { itemStyle: itemStyle_obj_green , value:[2,1,13] },
                { itemStyle: itemStyle_obj_green , value:[3,1,14] },
                // 第三行
                { itemStyle: itemStyle_obj_red , value:[0,2,21] },
                { itemStyle: itemStyle_obj_green , value:[1,2,22] },
                { itemStyle: itemStyle_obj_green , value:[2,2,23] },
                { itemStyle: itemStyle_obj_green , value:[3,2,24] }
            ]
            
            

            let option={
                title:{
                    text:'数据分析'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    name:'英雄',
                    type: 'category',
                    data: xData,
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
                        show: true,
                        lineStyle: {
                            color: "rgba(78, 108, 163, 0.9)",// 用分割线代表间隔距离
                            width: 10
                        }
                    },
                },
                yAxis: {
                    name:'属性',
                    type: 'category',
                    data: yData,
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
                        show: true,
                        lineStyle: {
                            color: "rgba(78, 108, 163, 0.6)",// 用分割线代表间隔距离
                            width: 10
                        }
                    },
                },
                visualMap: {
                    // color:colorData,
                    // min: 1,
                    // // max: 10,
                    // calculable: true,
                    // orient: 'vertical',
                    // left: 'left',
                    // bottom: '15%'
                },
                series:[
                    {
                        name: '测试图',
                        type: 'heatmap',
                        data: seriesData,
                        zlevel: -1
                    }
                ],
                dataZoom: [
                    {
                        type: 'slider',
                        xAxisIndex: 0,
                        startValue: 0, // 从头开始。
                        endValue: 1, // 一次性展示几个
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
                        endValue: 1, // 一次性展示几个
                    },
                ],
            }

            let newOption = {};
            if (xData.length) {
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