<template>
  <div class="content">
    <div class="app-main">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="[]">
          <router-view :key="key"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    key() {
      return this.$route.path
    },
  },
}
</script>
<style scoped>
.content {
  background-color: #f0f2f5;
  /* padding: 10px; */
  padding: 10px;
  height: calc(100% - 20px);
  overflow: hidden;
}
.app-main {
  /* padding: 10px; */
  /* position: relative; */
  /* overflow: hidden; */
  /* min-height: calc(100vh- 50px); */
  height: 100%;
  /* height: 100vh; */
  padding: 0px;
  /* overflow: auto; */
  /* background-color: #f0f2f5; */
  /* background-color: #fff; */
  background-color: transparent;
  box-sizing: border-box;
}

/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
