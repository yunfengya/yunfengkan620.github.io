<template>
    <div class="contain_box">
        <!-- 用于 three.js 渲染的容器，宽高设置为父容器的 90% -->
        <div ref="container" style="width: 90%; height: 90%;"></div>
    </div>
</template>

<script>
//安装 npm install three
//导入整个 three.js核心库
//import * as THREE from 'three';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
    name: "index",
    data() {
        return {
            // 遮罩层，用于加载时显示的状态
            loading: true,
        };
    },
    mounted() {
        // 初始化 three.js 场景
        this.initThree();

        // 监听窗口大小变化，以调整渲染器和摄像头的尺寸
        window.addEventListener('resize', this.onWindowResize);

        // 监听双击事件，控制全屏切换
        window.addEventListener('dblclick', this.toggleFullscreen);
    },
    beforeDestroy() {
        // 移除窗口事件监听器，避免组件销毁后事件继续触发
        window.removeEventListener('resize', this.onWindowResize);
        window.removeEventListener('dblclick', this.toggleFullscreen);
    },
    methods: {
        // 初始化 three.js 场景、相机、渲染器及其它必要元素
        initThree() {
            // 1. 创建场景
            this.scene = new THREE.Scene();

            // 2. 创建相机，设置 FOV（视场）、长宽比及近远裁剪平面
            this.camera = new THREE.PerspectiveCamera(
                75, // 视场角度
                this.$refs.container.clientWidth / this.$refs.container.clientHeight, // 宽高比基于父容器大小
                0.1, // 近裁剪面
                1000 // 远裁剪面
            );
            this.camera.position.set(0, 0, 10); // 设置相机位置
            this.scene.add(this.camera); // 将相机添加到场景中

            // 3. 创建一个立方体几何体
            const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
            const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // 设置颜色
            this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            this.cube.rotation.set(Math.PI / 4, 0, 0, "XZY"); // 设置旋转
            this.scene.add(this.cube); // 将立方体添加到场景中

            // 4. 初始化渲染器并将其尺寸设置为容器的宽高
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(this.$refs.container.clientWidth, this.$refs.container.clientHeight); // 设置渲染器大小为容器的 90%
            this.$refs.container.appendChild(this.renderer.domElement); // 将渲染器的 canvas 添加到 DOM 中

            // 5. 创建轨道控制器（OrbitControls）用于控制相机视角
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true; // 启用阻尼效果，模拟真实的相机惯性

            // 6. 添加坐标轴辅助器，用于显示坐标系，参数为轴的长度
            const axesHelper = new THREE.AxesHelper(5);
            this.scene.add(axesHelper);

            // 调用渲染函数进行场景渲染
            this.renderFn();
        },
        // 渲染循环函数
        renderFn() {
            // 更新控制器（用于轨道控制的阻尼效果）
            this.controls.update();

            // 渲染场景和相机
            this.renderer.render(this.scene, this.camera);

            // 使用 requestAnimationFrame 实现动画循环
            requestAnimationFrame(this.renderFn.bind(this));
        },
        // 监听窗口尺寸变化的回调函数
        onWindowResize() {
            const width = this.$refs.container.clientWidth;
            const height = this.$refs.container.clientHeight;

            // 更新相机的宽高比
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix(); // 更新相机的投影矩阵

            // 更新渲染器的大小
            this.renderer.setSize(width, height);
        },
        // 全屏/退出全屏的切换函数，双击触发
        toggleFullscreen() {
            const fullscreenElement = document.fullscreenElement;
            if (!fullscreenElement) {
                // 进入全屏模式
                this.renderer.domElement.requestFullscreen();
            } else {
                // 退出全屏模式
                document.exitFullscreen();
            }
        }
    },
};
</script>

<style scoped lang="scss">
/* 外部容器的样式，100% 占满父容器 */
.contain_box {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>
