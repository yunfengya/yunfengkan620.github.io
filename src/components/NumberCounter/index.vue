<template>
    <div class="counter-container">
        <div class="counter">
            <div
                v-for="(digit, index) in digits"
                :key="index"
                class="digit-container"
            >
                <div class="digit-list" :style="digitListStyle(index)">
                    <div v-for="(d, i) in digitSequence" :key="i" class="digit">
                        {{ i % 10 }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 
        使用方式
        <template>
            <div class="contain_box">
                <NumberCounter :target-number="targetNumber"/>
                <button @click="changeNumber">更改数字</button>
            </div>
        </template>

        <script>
        import NumberCounter from '@/components/NumberCounter'
        export default {
            name: "index",
            components: {
                NumberCounter
            },
            data() {
                return {
                    targetNumber:7140909
                };
            },
            mounted() {
                
            },
            beforeDestroy() {
                
            },
            methods: {
                changeNumber() {
                    this.targetNumber = Math.floor(Math.random() * 10000000)
                }
            }
        };
        </script>

        <style scoped lang="scss">
        .contain_box {
            width: 100%;
            height: 100%;
        }

        </style>

     -->
</template>

<script>
export default {
  name: "NumberCounter",
  props: {
    targetNumber: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 2000,
    },
    rollCount: {
      type: Number,
      default: 2,
    },
    delayBetweenDigits: {
      type: Number,
      default: 40,
    },
    digitHeight: {
      type: Number,
      default: 60,
    },
  },
  data() {
    return {
      digits: [],
    };
  },
  computed: {
    digitSequence() {
      const sequence = [];
      for (let i = 0; i <= this.rollCount; i++) {
        for (let j = 0; j < 10; j++) {
          sequence.push(j);
        }
      }
      return sequence;
    },
  },
  watch: {
    targetNumber: {
      immediate: true,
      handler(newVal) {
        this.digits = newVal.toString().split("");
        this.$nextTick(() => {
          this.animateToTarget();
        });
      },
    },
  },
  methods: {
    digitListStyle(index) {
      const targetDigit = parseInt(this.digits[index], 10);
      const extraRolls = this.rollCount * 10;
      const targetY = -(extraRolls + targetDigit) * this.digitHeight;
      const delay = (this.digits.length - index - 1) * this.delayBetweenDigits;

      return {
        transform: `translateY(${targetY}px)`,
        transition: `transform ${this.duration - delay}ms ease-in-out`,
      };
    },
    animateToTarget() {
      // 动画由样式自动触发
    },
  },
};
</script>

<style scoped>
.counter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.counter {
  display: flex;
}

.digit-container {
  width: 40px;
  height: 60px;
  overflow: hidden;
  position: relative;
  margin: 0 2px;
}

.digit-list {
  position: absolute;
}

.digit {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  height: 60px;
  font-weight: bold;
}
</style>
