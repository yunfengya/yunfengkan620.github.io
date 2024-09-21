<template>
    <div class="contain_box">
        <!-- 在容器上添加双击事件，用于切换全屏 -->
        <div>在外部建模上修改</div>
        <div id="container" @dblclick="toggleFullScreen" style="width: 98%; height: 98%;border:1px solid gray;"></div>
    </div>
</template>

<script>
import * as THREE from 'three' // 导入 Three.js 库
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' // 导入轨道控制器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' // 导入 GLTF 模型加载器

export default {
    data() {
        return {
            mesh: null, // 3D模型的网格对象
            camera: null, // Three.js 相机对象
            scene: null, // Three.js 场景对象
            renderer: null, // Three.js 渲染器对象
            controls: null // Three.js 轨道控制对象
        }
    },
    mounted() {
        this.init(); // 初始化场景
        window.addEventListener('resize', this.onWindowResize); // 监听窗口大小变化以动态调整渲染器尺寸
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onWindowResize); // 在组件销毁前移除窗口大小变化的监听器
    },
    methods: {
        // 初始化整个 Three.js 场景的设置
        init() {
            this.createScene(); // 创建场景
            this.loadGLTF(); // 加载 GLTF 模型
            this.createLight(); // 创建光源
            this.createCamera(); // 创建相机
            this.createRender(); // 创建渲染器
            this.createControls(); // 创建轨道控制器
            this.render(); // 开始渲染
        },
        // 创建 Three.js 场景
        createScene() {
            this.scene = new THREE.Scene(); // 创建一个空的场景对象
        },
        // 加载 GLTF 模型文件
        loadGLTF() {
            const loader = new GLTFLoader(); // 创建 GLTFLoader 实例
            loader.load(`/threejsFile/models/machineRoom.gltf`, ({ scene: { children } }) => {
                // console.log(...children);

                // < ==== 修改建模逻辑 1 2 ==================
                this.maps = new Map()
                children.forEach((obj) => {
                    const { map, color} = obj.material 
                    this.changeMat(obj, map, color)
                })
                // ======================================>

                this.scene.add(...children); // 将加载的模型添加到场景中
            });
        },
        // 修改建模逻辑 1  添加一个修改材质的方法changeMat()
        changeMat(obj, map, color) {
            if (map) {
                obj.material = new THREE.MeshBasicMaterial({
                map: this.crtTexture(map.name)
                })
            } else {
                obj.material = new THREE.MeshBasicMaterial({color})
            }
        },
        // 修改建模逻辑 2 添加建立纹理对象的方法crtTexture()
        crtTexture(imgName) {
            let curTexture = this.maps.get(imgName)
            if (!curTexture) {
                curTexture = new THREE.TextureLoader().load('/threejsFile/models/' + imgName)
                curTexture.flipY = false
                curTexture.wrapS = 1000
                curTexture.wrapT = 1000
                this.maps.set(
                    imgName,
                    curTexture
                )
            }
            return curTexture
        },


        // 创建并添加光源
        createLight() {
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // 创建环境光
            this.scene.add(ambientLight); // 将环境光添加到场景中

            const spotLight = new THREE.SpotLight(0xffffff); // 创建聚光灯
            spotLight.position.set(150, 150, 150); // 设置光源位置
            spotLight.castShadow = true; // 启用阴影投射
            this.scene.add(spotLight); // 将聚光灯添加到场景中
        },
        // 创建相机并设置相机位置
        createCamera() {
            const element = document.getElementById('container'); // 获取渲染容器元素
            const width = element.clientWidth;
            const height = element.clientHeight;
            const k = width / height; // 计算宽高比
            this.camera = new THREE.PerspectiveCamera(45, k, 0.1, 1000); // 创建透视相机
            this.camera.position.set(0, 10, 15); // 设置相机位置
            this.camera.lookAt(0, 0, 0); // 设置相机朝向
            this.scene.add(this.camera); // 将相机添加到场景中
        },
        // 创建并配置渲染器
        createRender() {
            const element = document.getElementById('container');
            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // 创建 WebGL 渲染器，启用抗锯齿和透明背景
            this.renderer.setSize(element.clientWidth, element.clientHeight); // 设置渲染器的大小为容器的宽高
            this.renderer.setClearColor(0x3f3f3f, 1); // 设置渲染器背景颜色
            element.appendChild(this.renderer.domElement); // 将渲染器的 DOM 元素添加到容器中
        },
        // 开始渲染循环
        render() {
            this.renderer.render(this.scene, this.camera); // 使用相机渲染场景
            requestAnimationFrame(this.render); // 每帧调用渲染
        },
        // 创建轨道控制器
        createControls() {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement); // 允许通过鼠标控制相机
        },
        // 处理窗口大小变化时调整相机和渲染器
        onWindowResize() {
            const element = document.getElementById('container');
            this.camera.aspect = element.clientWidth / element.clientHeight; // 更新相机宽高比
            this.camera.updateProjectionMatrix(); // 更新相机投影矩阵
            this.renderer.setSize(element.clientWidth, element.clientHeight); // 更新渲染器尺寸
        },
        // 双击切换全屏模式
        toggleFullScreen() {
            const element = document.getElementById('container'); // 获取需要全屏的容器元素
            if (!document.fullscreenElement) {
                // 如果当前没有全屏，则请求全屏
                element.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable full-screen mode: ${err.message}`); // 捕获全屏错误
                });
            } else {
                // 如果已经是全屏状态，则退出全屏
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
