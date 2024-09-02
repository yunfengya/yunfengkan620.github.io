<template>
    <div class="contain_box">
        <div class="btn_all">
            <button @click="onClear">清除</button>
            <button @click="onRotate">旋转</button>
            <button @click="onDownload">下载</button>
            <button @click="onSubmit">提交</button>
            <input type="color" v-model="strokeColor" id="colorPicker" />
        </div>
        <canvas id="cvs" ref="cvs" width="400" height="300"></canvas>
        <img id="signatureImage" :src="signatureData" alt="Signature Image" v-if="signatureData" />
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
            isDrawing: false,
            strokeColor: '#000000',
            signatureData: ''
        };
    },
    watch: {},
    created() { },
    mounted() {
        this.initCanvas();
    },
    watch: {
    strokeColor(newColor) {
      const ctx = this.$refs.cvs.getContext('2d');
      ctx.strokeStyle = newColor;
    }
  },
    methods: {
        initCanvas() {
            const cvs = this.$refs.cvs;
            const ctx = cvs.getContext('2d');

            // 设置初始颜色
            ctx.strokeStyle = this.strokeColor;

            // 初始化画布背景色
            ctx.fillStyle = '#dddddd';
            ctx.fillRect(0, 0, cvs.width, cvs.height);

            // 绑定绘图事件
            this.addEvents(cvs, 'mousedown', e => this.startDrawing(e, ctx));
            this.addEvents(cvs, 'mousemove', e => this.draw(e, ctx));
            this.addEvents(cvs, 'mouseup', () => this.stopDrawing());
        },
        addEvents(cvs, name, call) {
            const isMobile = navigator.userAgent.match(/Mobile/);
            const mobileNameObj = {
                mousedown: 'touchstart',
                mousemove: 'touchmove',
                mouseup: 'touchend'
            };
            if (isMobile) {
                cvs.addEventListener(mobileNameObj[name], e => {
                    call(e.touches[0]);
                });
            } else {
                cvs.addEventListener(name, e => {
                    call(e);
                });
            }
        },
        startDrawing(e, ctx) {
            this.isDrawing = true;
            ctx.beginPath();
            ctx.moveTo(e.pageX - this.$refs.cvs.offsetLeft, e.pageY - this.$refs.cvs.offsetTop);
        },
        draw(e, ctx) {
            if (this.isDrawing) {
                ctx.lineWidth = 5;
                ctx.lineTo(e.pageX - this.$refs.cvs.offsetLeft, e.pageY - this.$refs.cvs.offsetTop);
                ctx.strokeStyle = this.strokeColor;
                ctx.stroke();
            }
        },
        stopDrawing() {
            this.isDrawing = false;
        },
        onClear() {
            const cvs = this.$refs.cvs;
            const ctx = cvs.getContext('2d');
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            ctx.fillStyle = '#dddddd';
            ctx.fillRect(0, 0, cvs.width, cvs.height);
            this.signatureData = '';
        },
        onRotate() {
            const cvs = this.$refs.cvs;
            const ctx = cvs.getContext('2d');
            const img = new Image();
            img.src = cvs.toDataURL('image/png');
            img.onload = () => {
                const { width, height } = cvs;
                cvs.width = height;
                cvs.height = width;
                ctx.translate(cvs.width / 2, cvs.height / 2);
                ctx.rotate(Math.PI / 2);
                ctx.drawImage(img, -height / 2, -width / 2);
                ctx.resetTransform();
            };
        },
        onDownload() {
            const cvs = this.$refs.cvs;
            const a = document.createElement('a');
            a.setAttribute('download', 'signature.png');
            a.href = cvs.toDataURL('image/png');
            a.click();
        },
        onSubmit() {
            const cvs = this.$refs.cvs;
            this.signatureData = cvs.toDataURL('image/png');

            // 这里可以通过 AJAX 提交签名数据到服务器
            // 使用 this.signatureData 作为数据
        }
    },
};
</script>
  
<style scoped lang="scss">
.contain_box {
    width: 100%;
    height: 100%;
    overflow: auto;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .btn_all {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 10vh;
        background-color: #f0f0f0;
    }

    #cvs {
        background-color: #dddddd;
        border: 1px solid #ccc;
        margin-top: 20px;
    }

    button {
        margin: 10px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }

    #signatureImage {
        display: none;
        border: 1px orange solid;
        margin-top: 20px;
    }

    #colorPicker {
        margin: 10px;
    }
}</style>