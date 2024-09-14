<template>
    <div class="contain_box">
        <div>
            <div class="title">请带上耳机开始演奏</div>
            <div class="types">
                音调类型:
                <button class="btn" v-for="(type, index) in audioTypeList" :key="index" @click="setType(index)">
                    {{ type }}
                </button>
                <span>{{ audioTypeList[typeIndex] }}</span>
            </div>

            <div class="piano">
                <div v-for="(key, index) in whiteKeys" :key="index" class="white-key" :id="'key-' + key.name"
                    @click="handleClick(key)" :class="{ active: key.active }">
                    {{ key.name }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "index",
    components: {},
    data() {
        return {
            audioTypeList: ["sine", "square", "sawtooth", "triangle"],
            typeIndex: 1,
            whiteKeys: [
                { name: "d", frequency: 293.66, active: false },
                { name: "e", frequency: 329.63, active: false },
                { name: "f", frequency: 349.23, active: false },
                { name: "g", frequency: 392.0, active: false },
                { name: "h", frequency: 440.0, active: false },
                { name: "a", frequency: 493.88, active: false },
                { name: "b", frequency: 523.26, active: false },
                { name: "c", frequency: 587.33, active: false },
            ],
        };
    },
    watch: {},
    created() { },
    mounted() {
        // 添加键盘监听
        window.addEventListener("keydown", this.handleKeydown);
    },
    beforeDestroy() {
        // 移除键盘监听
        window.removeEventListener("keydown", this.handleKeydown);
    },
    watch: {

    },
    methods: {
        setType(i) {
            this.typeIndex = i;
        },
        create(frequency) {
            const volBl = 0.1;
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.type = this.audioTypeList[this.typeIndex];
            oscillator.frequency.value = frequency;

            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(1 * volBl, audioCtx.currentTime + 0.01);
            oscillator.start(audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.1 * volBl, audioCtx.currentTime + 1);
            oscillator.stop(audioCtx.currentTime + 1);
        },
        handleClick(key) {
            // 触发按键音效
            this.create(key.frequency);

            // 激活视觉效果
            key.active = true;
            setTimeout(() => {
                key.active = false;
            }, 200); // 200ms 后取消激活状态
        },
        handleKeydown(event) {
            const keyMap = {
                d: 293.66,
                e: 329.63,
                f: 349.23,
                g: 392.0,
                h: 440.0,
                a: 493.88,
                b: 523.26,
                c: 587.33,
            };

            const frequency = keyMap[event.key.toLowerCase()];
            if (frequency) {
                this.create(frequency);

                // 激活对应的按键样式
                const keyIndex = this.whiteKeys.findIndex(
                    (key) => key.name === event.key.toLowerCase()
                );
                if (keyIndex !== -1) {
                    this.whiteKeys[keyIndex].active = true;

                    setTimeout(() => {
                        this.whiteKeys[keyIndex].active = false;
                    }, 200); // 200ms 后取消激活状态
                }
            }
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
    border: 1px solid gray;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .title{
        font-size: 20px;
        font-weight: 600;
        color: #24d9ff;
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    .types{
        .btn{
            margin: 0 1rem 0 0;
            height: 2rem;
            line-height: 2rem;
            min-width: 5rem;
        }
    }
    .piano {
        display: flex;
        position: relative;
        margin-top: 50px;
        white-space: nowrap;
        background: #000;
        border-radius: 10px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
        transform-style: preserve-3d;
        transform: rotateX(10deg) rotateY(0deg);
        .white-key {
            height: 120px;
            width: 60px;
            background: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            position: relative;
            cursor: pointer;
            display: inline-block;
            transform: rotateX(0deg);
            transform-style: preserve-3d;
            transition: transform 0.1s, box-shadow 0.1s;
        }
    
        .white-key.active {
            transform: translateY(4px) rotateX(10deg);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
        }
    }

}
</style>