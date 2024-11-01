<template>
    <div class="contain_box">
        <RangeSelector 
            v-model="selectedRange" 
            :options="options" 
            @change="handleChange" 
            @clear="handleClear"
        ></RangeSelector>
    </div>
</template>

<script>
import RangeSelector from './RangeSelector.vue'

export default {
    components: {
        RangeSelector
    },
    data() {
        return {
            selectedRange: [2, 5],
            options: [
                { label: 'WK1', value: 1 },
                { label: 'WK2', value: 2 },
                { label: 'WK3', value: 3 },
                { label: 'WK4', value: 4 },
                { label: 'WK5', value: 5 },
                { label: 'WK6', value: 6 },
            ],
        };
    },
    methods: {
        handleChange(selectedRange) {
            console.log('Range changed:', selectedRange);
        },
        handleClear() {
            console.log('Range cleared');
        }
    },
};
</script>
<style scoped lang="scss">
/* 容器样式 */
.contain_box {
    width: 100%;
    height: calc(100vh - 4.2rem);
    /* 视口的高度减去顶部的导航栏高度 */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    /* 外框样式 */
}

</style>