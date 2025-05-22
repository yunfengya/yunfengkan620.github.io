<template>
    <div class="contain_box">
        <div class="pulse-wrapper">
            <div class="pulse red"></div>
            <div class="pulse blue"></div>
            <div class="pulse green"></div>
            <div class="pulse yellow"></div>
        </div>           
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            
        };
    },
    mounted() {
        
    },
    beforeDestroy() {
        
    },
    methods: {
        
    }
};
</script>

<style scoped lang="scss">
/* 容器样式 */
.contain_box {
    width: 100%;
    height: 100%;
    /* 视口的高度减去顶部的导航栏高度 */
    
    .pulse-wrapper {
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .pulse {
        background: rgb(var(--pulse-color));
        border-radius: 50%;
        height: 30px;
        width: 30px;
        box-shadow: 0 0 0 0 rgba(var(--pulse-color), 1);
        transform: scale(1);
        animation: pulse 1s infinite;
    }

    @keyframes pulse {
        0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(var(--pulse-color), 0.7);
        }

        70% {
            transform: scale(1);
            box-shadow: 0 0 0 15px rgba(var(--pulse-color), 0);
        }

        100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(var(--pulse-color), 0);
        }
    }

    /* Define different color circles */
    .pulse.red {
        --pulse-color: 222, 84, 72;
    }
    .pulse.blue {
        --pulse-color: 66, 103, 178;
    }
    .pulse.green {
        --pulse-color: 76, 175, 80;
    }
    .pulse.yellow {
        --pulse-color: 255, 210, 63;
    }           
}

</style>
