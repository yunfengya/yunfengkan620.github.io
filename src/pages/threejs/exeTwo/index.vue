<template>
    <div class="contain_box"> 
        <!-- 添加双击事件 -->
        <div id="container" @dblclick="toggleFullScreen"></div>
    </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default {
    data() {
        return {
            mesh: null,
            camera: null,
            scene: null,
            renderer: null,
            controls: null
        }
    },
    mounted() {
        this.init();
        window.addEventListener('resize', this.onWindowResize); // 监听窗口大小变化
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onWindowResize); // 移除监听器
    },
    methods: {
        init() {
            this.createScene(); // 创建场景
            this.loadGLTF(); // 加载GLTF模型
            this.createLight(); // 创建光源
            this.createCamera(); // 创建相机
            this.createRender(); // 创建渲染器
            this.createControls(); // 创建控件对象
            this.render(); // 渲染
        },
        createScene() {
            this.scene = new THREE.Scene();
        },
        loadGLTF() {
            const loader = new GLTFLoader();
            loader.load(`/models/machineRoom.gltf`, ({ scene: { children } }) => {
                this.scene.add(...children);
            });
        },
        createLight() {
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
            this.scene.add(ambientLight);
            const spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(150, 150, 150);
            spotLight.castShadow = true;
            this.scene.add(spotLight);
        },
        createCamera() {
            const element = document.getElementById('container');
            const width = element.clientWidth;
            const height = element.clientHeight;
            const k = width / height;
            this.camera = new THREE.PerspectiveCamera(45, k, 0.1, 1000);
            this.camera.position.set(0, 10, 15);
            this.camera.lookAt(0, 0, 0);
            this.scene.add(this.camera);
        },
        createRender() {
            const element = document.getElementById('container');
            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            this.renderer.setSize(element.clientWidth, element.clientHeight);
            this.renderer.setClearColor(0x3f3f3f, 1);
            element.appendChild(this.renderer.domElement);
        },
        render() {
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(this.render);
        },
        createControls() {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        },
        onWindowResize() {
            const element = document.getElementById('container');
            this.camera.aspect = element.clientWidth / element.clientHeight; // 更新相机宽高比
            this.camera.updateProjectionMatrix(); // 更新投影矩阵
            this.renderer.setSize(element.clientWidth, element.clientHeight); // 更新渲染器尺寸
        },
        toggleFullScreen() {
            const element = document.getElementById('container');
            if (!document.fullscreenElement) {
                element.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable full-screen mode: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        }
    }
}
</script>

<style scoped lang="scss">
.contain_box {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    #container {
        width: 90%;
        height: 90%;
    }
}
</style>
