<template>
    <div class="contain_box">
        <div style="width:90%;height:90%;">
            <el-button type="success" @click="exceljsEchartsImageFn">多个sheet 和每个sheet中有多个小表格  echarts多个图片</el-button>
            <p>.</p>
        </div>
    </div>
</template>

<script>
import * as ExcelJS from 'exceljs'
export default {
    name: "index",
    data() {
        return {

        };
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
        // 多个sheet 和每个sheet中有多个小表格  echarts多个图片   import * as ExcelJS from 'exceljs'
        async exceljsEchartsImageFn() {
            // 创建一个新的工作簿
            let workbook = new ExcelJS.Workbook();
            // 定义数据集，包括表名、自定义表头、数据字段和数据列表
            let datasets = [
                {
                    name: 'sheet1',
                    data: [
                        {
                            name: '小表格1',
                            headers: ['厂区名', '机种名', '段别名', '楼栋名', '楼层名'],
                            columns: ['site', 'model', 'stage', 'floord', 'floor'],
                            list: [
                                { site: '厂区A', model: '机种1', stage: '段别1', floord: '楼栋1', floor: '1楼',value:'20', xName: 'kkk' },
                                { site: '厂区B', model: '机种2', stage: '段别2', floord: '楼栋2', floor: '2楼',value:'30', xName: 'yyy' },
                                // ... 更多数据项
                            ],
                        },
                        {
                            name: '小表格2',
                            headers: ['厂区名', '机种名', '段别名', '楼栋名', '楼层名'],
                            columns: ['site', 'model', 'stage', 'floord', 'floor'],
                            list: [
                                { site: '厂区C', model: '机种3', stage: '段别3', floord: '楼栋3', floor: '3楼' ,value:'40', xName: 'kkk' },
                                { site: '厂区D', model: '机种4', stage: '段别4', floord: '楼栋4', floor: '4楼' ,value:'50', xName: 'yyy' },
                                // ... 更多数据项
                            ],
                        },
                        // ... 更多小表格数据
                    ],
                },
                // ... 更多sheets数据
                {
                    name: 'sheet2',
                    data: [
                        {
                            name: '小表格1',
                            headers: ['厂区名2', '机种名', '段别名', '楼栋名', '楼层名'],
                            columns: ['site', 'model', 'stage', 'floord', 'floor'],
                            list: [
                                { site: '厂区A', model: '机种1', stage: '段别1', floord: '楼栋1', floor: '1楼',value:'60', xName: 'kkk'  },
                                { site: '厂区B', model: '机种2', stage: '段别2', floord: '楼栋2', floor: '2楼',value:'70', xName: 'yyy'  },
                                // ... 更多数据项
                            ],
                        },
                        {
                            name: '小表格2',
                            headers: ['厂区名2', '机种名', '段别名', '楼栋名', '楼层名'],
                            columns: ['site', 'model', 'stage', 'floord', 'floor'],
                            list: [
                                { site: '厂区C', model: '机种3', stage: '段别3', floord: '楼栋3', floor: '3楼' ,value:'80', xName: 'kkk' },
                                { site: '厂区D', model: '机种4', stage: '段别4', floord: '楼栋4', floor: '4楼' ,value:'90', xName: 'yyy' },
                                // ... 更多数据项
                            ],
                        },
                        // ... 更多小表格数据
                    ],
                },
            ];

            // 遍历数据集，为每个数据集创建一个工作表，并填充数据
            for (let dataset of datasets) {
                // 创建一个新的工作表
                let worksheet = workbook.addWorksheet(dataset.name);
                let currentRow = 1;
                for (let subDataset of dataset.data) {
                    // 添加小表格的标题
                    worksheet.mergeCells(currentRow, 1, currentRow, subDataset.headers.length);
                    let titleCell = worksheet.getCell(currentRow, 1);
                    titleCell.value = subDataset.name;
                    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
                    // 保存表名的行数
                    let titleRow = currentRow;
                    currentRow++;
                    // 写入自定义表头
                    subDataset.headers.forEach((header, index) => {
                        worksheet.getCell(currentRow, index + 1).value = header;
                    });
                    currentRow++;
                    // 写入数据列表
                    subDataset.list.forEach((rowData) => {
                        subDataset.columns.forEach((column, columnIndex) => {
                            worksheet.getCell(currentRow, columnIndex + 1).value = rowData[column];
                        });
                        currentRow++;
                    });
                    // 在每个小表格之间添加一行空白
                    // currentRow++;
                    currentRow+=8;

                    // 生成添加 ECharts 图表作为图片
                    let base64Image = await this.generateEChartsImage(subDataset.list, this.$echarts);

                    let imageId = workbook.addImage({
                        base64: base64Image,
                        extension: 'png',
                    });
                    worksheet.addImage(imageId, {
                        tl: { col: subDataset.headers.length + 1, row: titleRow  },  // 图片位置是表名右边
                        ext: { width: 300, height: 200 },  // 图片的宽度和高度
                    });
                }
            }
            // 导出工作簿
            workbook.xlsx.writeBuffer().then((buffer) => {
                let blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'exceljsFn下载的工作簿.xlsx';
                link.click();
            });
        },
        // 生成添加 ECharts 图表作为图片 方法
        async generateEChartsImage(list, echarts) {
            // 提取 xName 和 value 数据
            let xNameArr = list.map(item => item.xName);
            let valueArr = list.map(item => item.value);
            let option = {
                // backgroundColor:'#000237',
                title: {
                    text: "图标名称",
                    left: "center",
                    // top: "center",
                    top: "0%",
                    color: "#000",
                    fontWeight: "normal",
                    fontSize: this.setFontSize(14),
                },
                grid: {
                    top: '12%',
                    left: '8%',
                    right: '4%',
                    bottom: '8%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,//折线图在x轴的起始点是否贴y轴
                    axisLine: { //坐标轴轴线相关设置。数学上的x轴
                        show: true,
                        lineStyle: {
                            color: '#233653' //x轴颜色
                        },
                    },
                    axisTick: {
                        alignWithLabel: true,//让图表在刻度线的刻度上
                        show: false, // 不显示坐标轴刻度线
                        length: 5,
                        // color:'#fff',
                        lineStyle: {
                            color: '#000'//x轴刻度线颜色
                        },
                    },
                    axisLabel: { //坐标轴刻度标签的相关设置
                        // margin: 6,
                        color: '#000000',
                        fontSize: this.setFontSize(28),
                        formatter: (item) => {
                            return item
                            // return '{a|' + item.substring(0, 8) + '~}';
                        },
                        // rich: {
                        //     a: {
                        //         fontSize: 12,
                        //         lineHeight: 20,
                        //         align: 'center',
                        //         width: 50,   // 设置标签宽度为100像素
                        //         overflow: 'truncate'   // 超出部分省略号显示
                        //     }
                        // }
                    },
                    splitLine: {
                        show: false,
                    },
                    data: xNameArr
                },
                yAxis: {
                    // name:'单位:min',
                    name: '',
                    nameLocation: 'end',// x轴name处于x轴的什么位置
                    // splitNumber:4,//分割成几段
                    nameTextStyle: { // x轴name的样式调整
                        color: '#00FDF6',
                        fontSize: this.setFontSize(28),
                        padding: [0, 0, -10, -10]  // 加上padding可以调整其位置
                    },
                    min: 0,//起始值
                    splitLine: {//分割线
                        show: true,
                        lineStyle: {
                            type: "dashed",
                            color: "rgba(33, 57, 93,.4)",
                        },
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        // show: false,
                        color: "#000",
                        fontSize: this.setFontSize(24),
                        margin: 2,
                    },
                    axisTick: {
                        show: false,
                    },
                },
                series: [
                    {
                        name: 'fffff',
                        type: 'line',
                        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
                        showAllSymbol: true,
                        symbolSize: this.setFontSize(12),//拐点大小
                        smooth: true, // 是否是平滑曲线
                        lineStyle: {
                            width: this.setFontSize(6),
                            color: "#0cb3fd", // 线条颜色
                        },
                        // 折线图 拐点 圆点颜色样式
                        itemStyle: {
                            // color: "#0cb3fd",
                            color: "#000",
                            borderWidth: this.setFontSize(6),
                            borderColor: "#000"
                        },
                        // 折线 头部 上方文字
                        label: {
                            show: true,
                            position: [this.setFontSize(20), this.setFontSize(-30)],
                            // 顶部文字的颜色
                            color: '#000',

                            fontSize: this.setFontSize(28),
                            align: 'center',
                            formatter: "{c}",

                        },
                        data: valueArr,
                    }
                ],
                dataZoom: [
                    {
                        // fillerColor: 'rgba(1,1,1,0)', //滑块的颜色
                        backgroundColor: 'transparent',  // 滑块轨道的颜色
                        borderColor: 'transparent', // 滑块轨道边框的颜色
                        // handleSize: '110%',
                        // handleStyle:{
                        //     color:"red",
                        // },
                        moveHandleSize: 1,//移动手柄的尺寸高度。
                        moveOnMouseMove: true,
                        textStyle: {
                            color: "rgba(1,1,1,0)"
                        },
                        type: 'slider',
                        show: true,
                        // show: true,
                        height: this.setFontSize(3),
                        bottom: '1%',
                        // start: 0,
                        // end: 100,
                        startValue: 0, // 从头开始。
                        endValue: 8, // 一次性展示几个
                    },
                    {
                        type: 'inside',
                        realtime: true,
                    }
                ]
            };
            // 暂无数据的处理
            let newOption = {};
            if (valueArr.length) {
                newOption = option;
            } else {
                // 接口数据 没有时
                newOption = {
                    title: {
                        text: "暂无数据",
                        left: "center",
                        top: "center",
                        color: "#8994a1",
                        fontWeight: "normal",
                        fontSize: this.setFontSize(14),
                    },
                };
            }

            // 创建一个新的 div 并将 ECharts 图表渲染到该 div
            let echartsDiv = document.createElement('div');
            echartsDiv.style.width = '600px';
            echartsDiv.style.height = '400px';
            echartsDiv.style.position = 'absolute';  // 设置为绝对定位
            echartsDiv.style.left = '-9999px';  // 将其放置在视窗之外
            document.body.appendChild(echartsDiv);

            let myChart = echarts.init(echartsDiv);
            myChart.setOption(newOption);
            // 添加延迟
            await new Promise(resolve => setTimeout(resolve, 1000));  // 延迟1秒
            // 使用 ECharts 的 getDataURL 方法获取图表的 Base64 编码的 URL
            let base64Image = myChart.getDataURL({
                type: 'png',
                pixelRatio: 2,
                backgroundColor: '#fff'
            });
            // 将 'data:image/png;base64,' 部分从 URL 中移除
            base64Image = base64Image.replace('data:image/png;base64,', '');
            // 删除 div
            document.body.removeChild(echartsDiv);
            return base64Image;
        },
        
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
}
</style>
