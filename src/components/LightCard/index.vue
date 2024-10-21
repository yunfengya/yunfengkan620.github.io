<template>
    <div class="item" ref="cardRef"></div>
</template>
  
<script>
export default {
    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            cardRef: null,
            lightRef: document.createElement('div'),
            cardOverflow: '',
        };
    },
    methods: {
        setLightStyle() {
            const { width = 60, height = 60, color = '#ff4132', blur = 40 } = this.options.light ?? {};
            this.lightRef.style.position = 'absolute';
            this.lightRef.style.width = `${width}px`;
            this.lightRef.style.height = `${height}px`;
            this.lightRef.style.background = color;
            this.lightRef.style.filter = `blur(${blur}px)`;
        },
        setCardOverflowHidden() {
            if (this.cardRef) {
                this.cardOverflow = this.cardRef.style.overflow;
                this.cardRef.style.overflow = 'hidden';
            }
        },
        restoreCardOverflow() {
            if (this.cardRef) {
                this.cardRef.style.overflow = this.cardOverflow;
            }
        },
        addLight() {
            if (this.cardRef) {
                this.cardRef.appendChild(this.lightRef);
            }
        },
        removeLight() {
            if (this.cardRef) {
                this.cardRef.removeChild(this.lightRef);
            }
        },
        onMouseEnter() {
            this.addLight();
            this.setCardOverflowHidden();
        },
        onMouseMove(e) {
            const { clientX, clientY } = e;
            if (this.cardRef) {
                const { x, y } = this.cardRef.getBoundingClientRect();
                const { width, height } = this.lightRef.getBoundingClientRect();
                this.lightRef.style.left = `${clientX - x - width / 2}px`;
                this.lightRef.style.top = `${clientY - y - height / 2}px`;

                const maxXRotation = 10;
                const maxYRotation = 10;

                const rangeX = 200 / 2;
                const rangeY = 200 / 2;

                const rotateX = ((clientX - x - rangeY) / rangeY) * maxXRotation;
                const rotateY = -1 * ((clientY - y - rangeX) / rangeX) * maxYRotation;

                this.cardRef.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        },
        onMouseLeave() {
            this.removeLight();
            this.restoreCardOverflow();
        },
    },
    mounted() {
        this.cardRef = this.$refs.cardRef;

        this.setLightStyle();
        this.cardRef.addEventListener('mouseenter', this.onMouseEnter);
        this.cardRef.addEventListener('mousemove', this.onMouseMove);
        this.cardRef.addEventListener('mouseleave', this.onMouseLeave);
    },
    beforeDestroy() {
        this.cardRef.removeEventListener('mouseenter', this.onMouseEnter);
        this.cardRef.removeEventListener('mousemove', this.onMouseMove);
        this.cardRef.removeEventListener('mouseleave', this.onMouseLeave);
    },
};
</script>
  
<style scoped lang="scss">
.item {
    position: relative;
    width: 125px;
    height: 125px;
    background: #1c1c1f;
    border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
  