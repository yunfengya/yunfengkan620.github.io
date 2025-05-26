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
