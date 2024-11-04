<template>
    <div class="contain_box">
        <!-- 展示生成的二维码图片 -->
        <img :src="qrCodeImg" />
    </div>
</template>

<script>
// npm install qrcode
import QRCode from 'qrcode'

export default {
    data() {
        return {
            qrCodeImg: '' // 用于存储生成的二维码图片的数据 URL
        };
    },
    mounted() {
        // 在组件加载完成后，生成二维码
        let text = 'https://www.baidu.com' // 要生成二维码的文本
        let qrCodeOptions = {
            errorCorrectionLevel: 'H', // 设置错误纠正级别
            version: 10, // 设置二维码的版本
            color: {
                dark: '#d7c081', // 二维码的颜色
                light: '#2b599e' // 二维码的背景色
            },
            width: 200,  // 设置二维码的宽度为200像素
            type: 'png', // 设置输出图片的类型为 png
            margin: 4, // 设置二维码的边距为 2
            scale: 4, // 设置图片的放大倍数为 4
            maskPattern: 1 // 设置掩模模式为 1
        }
        this.generateQRCode(text,qrCodeOptions)
    },
    methods: {
        async generateQRCode(text,qrCodeOptions) {
            try {
                // 调用 QRCode.toDataURL 方法生成二维码图片的数据 URL
                this.qrCodeImg = await QRCode.toDataURL(text,qrCodeOptions)
            } catch (err) {
                // 如果出错，打印错误信息
                console.error(err)
            }
        }
    },
};
</script>

<style scoped lang="scss">
/* 容器样式 */
.contain_box {
    width: 100%; // 容器的宽度为100%
    height: calc(100vh - 4.2rem); // 容器的高度为视口的高度减去顶部的导航栏高度
    overflow: hidden; // 隐藏超出容器的内容
    display: flex; // 设置容器为弹性盒子
    justify-content: center; // 在主轴方向上居中对齐
    align-items: center; // 在交叉轴方向上居中对齐
    border: 1px solid gray; // 设置容器的边框
}
</style>
