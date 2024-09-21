<template>
    <div class="contain_box">
        <!-- 在容器上添加双击事件，用于切换全屏 -->
        <div>在外部建模上修改<a href="https://juejin.cn/post/7171075542882451463?" target="_blanck">链接参考</a></div>
        <div id="container" @dblclick="toggleFullScreen" @mousemove="mouseMove"
            style="width: 98%; height: 98%;border:1px solid gray;">
            <div id='plane' :style="{ left: state.planePos.left, top: state.planePos.top, display: state.planeDisplay }">
                <p>机柜名称：{{ state.curCabinet.name }}</p>
                <p>机柜温度：{{ state.curCabinet.temperature }}°</p>
                <p>使用情况：{{ state.curCabinet.count }} / {{ state.curCabinet.capacity }}</p>
            </div>
        </div>

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
            controls: null, // Three.js 轨道控制对象

            maps: null,
            //机柜集合
            cabinets: [],
            //鼠标划入的机柜
            curCabinet: null,
            // 记录原始材质
            originalMaterials: new Map(),

            state: {
                planePos: {
                    //信息面板的位置
                    left: 0,
                    top: 0
                },
                //信息面板的可见性
                planeDisplay: 'none',
                // planeDisplay: 'visible',
                //机柜信息
                curCabinet: {
                    //名称
                    name: 'Loading……',
                    //温度
                    temperature: 0,
                    //容量
                    capacity: 0,
                    //服务器数量
                    count: 0
                }
            }

        }
    },
    mounted() {
        this.maps = new Map()
        this.crtTexture("cabinet-hover.jpg")

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
            loader.load('/threejsFile/models/machineRoom.gltf', ({ scene: { children } }) => {
                children.forEach((obj) => {
                    const { map, color } = obj.material;
                    this.changeMat(obj, map, color);
                    if (obj.name.includes('cabinet')) {
                        this.cabinets.push(obj);
                        // 保存原始材质
                        this.originalMaterials.set(obj.uuid, obj.material);
                    }
                });
                this.scene.add(...children); // 将加载的模型添加到场景中
            });
        },
        // 修改建模逻辑 1  添加一个修改材质的方法changeMat()
        changeMat(obj, map, color) {
            if (map) {
                obj.material = new THREE.MeshBasicMaterial({
                    map: this.crtTexture(map.name)
                });
            } else {
                obj.material = new THREE.MeshBasicMaterial({ color });
            }
        },
        // 修改建模逻辑 2 添加建立纹理对象的方法crtTexture()
        crtTexture(imgName) {
            let curTexture = this.maps.get(imgName);
            if (!curTexture) {
                curTexture = new THREE.TextureLoader().load('/threejsFile/models/' + imgName);
                curTexture.flipY = false;
                curTexture.wrapS = 1000;
                curTexture.wrapT = 1000;
                this.maps.set(imgName, curTexture);
            }
            return curTexture;
        },
        // 加载hover图片
        hover_cabinet_fn() {
            this.maps = new Map();
            this.crtTexture("cabinet-hover.jpg");
        },
        // 鼠标移动事件
        // 鼠标移动事件
        mouseMove(event) {
            const element = document.getElementById('container'); // 获取容器元素
            const { clientX, clientY } = event; // 从事件中获取鼠标坐标

            // 计算相对坐标
            const rect = element.getBoundingClientRect(); // 获取容器的位置和尺寸
            const x = clientX - rect.left; // 计算鼠标在容器内的X坐标
            const y = clientY - rect.top; // 计算鼠标在容器内的Y坐标

            this.selectCabinet(x, y); // 传递相对坐标
            this.hover_cabinet_fn();
        }
        ,
        //鼠标划入机柜事件，参数为机柜对象
        onMouseOverCabinet(cabinet) { 
            console.log(cabinet); 
            this.state.planeDisplay = 'block'
        },
        //鼠标在机柜上移动的事件，参数为鼠标在canvas画布上的坐标位
        onMouseMoveCabinet(x, y) { 
            console.log(x, y); 
            // this.state.planePos.left = x + 'px'
            // this.state.planePos.top = y + 'px'
            this.state.planePos.left = (x+0) + 'px'
            this.state.planePos.top = (y+80) + 'px'
        },
        //鼠标划出机柜的事件
        onMouseOutCabinet() { 
            this.state.planeDisplay = 'none'
        },
        // 建立一个射线投射器，一个二维点，以避免在鼠标选择时机柜时重复实例化; 添加选择模型的方法selectCabinet(x,y)，其参数为鼠标的坐标位
        selectCabinet(x, y) {
            const { cabinets, renderer, camera, maps, curCabinet, originalMaterials } = this;
            const { width, height } = renderer.domElement;

            // 创建射线投射器和鼠标位置向量
            const raycaster = new THREE.Raycaster();
            const pointer = new THREE.Vector2();

            // 将鼠标坐标转换为裁剪空间坐标（[-1, 1] 区间）
            pointer.set(
                (x / width) * 2 - 1,
                -(y / height) * 2 + 1
            );

            // 基于相机和鼠标指针位置设置射线投射器
            raycaster.setFromCamera(pointer, camera);

            // 获取与机柜相交的对象
            const intersects = raycaster.intersectObjects(cabinets);

            // 如果有交互的对象，则选择第一个机柜
            let intersectObj = intersects.length > 0 ? intersects[0].object : null;

            // 如果上次选择的机柜存在且与当前机柜不同，重置上次机柜材质
            if (curCabinet && curCabinet !== intersectObj) {
                const originalMaterial = originalMaterials.get(curCabinet.uuid);
                if (originalMaterial) {
                    curCabinet.material = originalMaterial; // 重置为原始材质
                    curCabinet.material.needsUpdate = true; // 强制更新材质
                }
            }

            // 如果当前有交互对象，并且不是之前已经选中的机柜
            if (intersectObj) {
                this.onMouseMoveCabinet(x,y)
                // 如果是新的机柜对象，将其高亮
                if (intersectObj !== curCabinet) {
                    this.curCabinet = intersectObj; // 更新当前选中的机柜
                    const material = intersectObj.material;
                    const originalMaterial = originalMaterials.get(intersectObj.uuid);
                    if (originalMaterial) {
                        intersectObj.material = new THREE.MeshBasicMaterial({
                            map: this.crtTexture("cabinet-hover.jpg")
                        });
                        intersectObj.material.needsUpdate = true; // 强制更新材质
                    }
                    this.onMouseOverCabinet(intersectObj); // 触发鼠标移入机柜事件
                }
            } else if (curCabinet) {
                // 如果没有选中的对象且之前有机柜被选中，则重置
                this.curCabinet = null; // 清空当前选中的机柜
                this.onMouseOutCabinet(); // 触发鼠标移出机柜事件
            }
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
            this.renderer.shadowMap.enabled = true; // 启用阴影贴图
            element.appendChild(this.renderer.domElement); // 将渲染器的 DOM 元素添加到容器中
        },
        // 渲染循环，将场景和相机渲染到画布中
        render() {
            this.renderer.render(this.scene, this.camera); // 渲染场景
            this.controls.update(); // 更新控制器状态
            requestAnimationFrame(this.render); // 请求下一帧渲染
        },
        // 创建轨道控制器，用于控制相机的交互
        createControls() {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement); // 创建轨道控制器
            this.controls.enableDamping = true; // 启用阻尼效果
            this.controls.dampingFactor = 0.25; // 设置阻尼因子
            this.controls.enableZoom = true; // 启用缩放
            this.controls.enablePan = true; // 启用平移
        },
        // 处理窗口大小变化的事件，重新调整相机和渲染器的尺寸
        onWindowResize() {
            const element = document.getElementById('container');
            this.camera.aspect = element.clientWidth / element.clientHeight; // 更新相机的宽高比
            this.camera.updateProjectionMatrix(); // 更新相机的投影矩阵
            this.renderer.setSize(element.clientWidth, element.clientHeight); // 重新设置渲染器的尺寸
        },
        // 切换全屏模式
        toggleFullScreen() {
            const element = document.getElementById('container');
            if (!document.fullscreenElement) {
                element.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
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

    #plane {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 10px 10px;
        border: 1px solid orange;
        border-radius: 10px;
        transform: translate(12px, -100%);
        display: none;
        // display: visible;
    }

}
</style>
