<template>
    <div class="contain_box">
        <img id="image" src="../../../assets/cartoonFigure.png" alt="">
        <canvas id="canvas"></canvas>
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
    mounted(){
        this.draw()
    },
    watch: {},
    created() { },
    methods: {
        draw() {
            const canvas = document.getElementById('canvas');
            const img = document.getElementById('image');
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                if (!canvas.getContext) return;
                const ctx = canvas.getContext('2d');
                // 设置一个颜色覆盖在这个图片上
                ctx.beginPath();
                ctx.fillStyle = 'gray';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // 属性方法
                ctx.globalCompositeOperation = 'destination-out';
                // 设置画笔为圆形
                ctx.lineCap = 'round';
                // 设置画笔宽度
                ctx.lineWidth = 100;

                // 当鼠标按下的时候
                canvas.onmousedown = (e) => {
                    // console.log('按下');
                    const x = e.offsetX;
                    const y = e.offsetY;
                    ctx.moveTo(x, y);
                    this.moves(ctx);
                };
                // 当鼠标移动的时候
                canvas.onmouseup = () => {
                    // console.log('抬起');
                    canvas.onmousemove = null;
                };
            };
        },
        moves(ctx) {
            canvas.onmousemove = (e) => {
                // console.log('移动');
                const x = e.offsetX;
                const y = e.offsetY;
                // 开始画
                ctx.lineTo(x, y);
                // 描绘出路径
                ctx.stroke();
            };
        }
    },
};
</script>
  
<style scoped lang="scss">
.contain_box {
    width: 100%;
    // height: 100%;
    height: calc(100% - 4.2rem);
    overflow: auto;
    border: 1px solid gray;

    position: relative;
    #canvas,#image{
        width: 50%;
        height: 50%;
        position: absolute;
        left: 0;
        cursor: pointer;
    }
}
</style>