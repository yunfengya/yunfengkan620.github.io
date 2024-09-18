<!-- Card.vue -->
<template>
    <div class="box">
        <a :href="link" target="_blank">
            <span>{{ content }}</span>
            <img :src="imgUrl" alt="" style="width:50px;height:50px;">
        </a>
    </div>
</template>
  
<script>
export default {
    props: {
        content: {
            type: String,
            default: 'Hover Me'
        },
        imgUrl: {
            type: String,
            default: '#'
        },
        link: {
            type: String,
            default: '#'
        },
    },
    methods: {
        
    }
}
</script>
  
<style scoped>
.box {
    width: 200px;
    height: 260px;
    list-style: none;
    margin: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.box a {
    text-decoration: none;
    display: block;
    width: 100px;
    height: 160px;
    background: #878787;
    padding-left: 20px;
    position: relative;
    transform: rotate(0.1deg) skew(2deg) translate(0, 0);
    transition-duration: 0.5s;
    box-shadow: -20px 20px 10px rgba(0, 0, 0, 0.5);
}

.box a:before {
    content: '';
    position: absolute;
    top: 10px;
    left: -20px;
    height: 100%;
    width: 20px;
    background: #676767;
    transition-duration: 0.5s;
    transform: rotate(0deg) skewY(-45deg);
}

.box a:after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: -10px;
    height: 20px;
    width: 100%;
    background: #979797;
    transition-duration: 0.5s;
    transform: rotate(0deg) skewX(-45deg);
}

.box a span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    letter-spacing: 1px;
    transition: 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 900;
}

.box a:hover {
    transform: rotate(0.1deg) skew(2deg) translate(20px, -15px);
    box-shadow: -50px 50px 50px rgba(0, 0, 0, 0.5);
}

.box:hover span {
    color: #fff;
}

.box:hover a {
    background: #00aced;
}

.box:hover a:before {
    background: #097aa5;
}

.box:hover a:after {
    background: #53b9e0;
}
</style>
  