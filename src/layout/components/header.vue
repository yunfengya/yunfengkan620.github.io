<template>
  <div class="app-header">
    <div class="header">
      <div class="header_left">
        <div class="left">
          <i @click="getSide" v-if="sidebar" class="el-icon-d-arrow-left"></i>
          <i @click="getSide" v-else class="el-icon-d-arrow-right"></i>
        </div>
        <div class="right">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in matched" :key="index">
              <span
                v-if="
                  item.redirect === 'noRedirect' || index == matched.length - 1
                "
                >{{ item.meta.title }}</span
              >
              <span
                v-else
                @click="goPath(item)"
                :class="$route.fullPath === item.path ? 'active' : ''"
                >{{ item.meta.title }}</span
              >
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="header_right">
        <el-dropdown trigger="click">
          <div style="display:flex;justify-content:center;align-items:center;cursor: pointer;">
            <el-avatar :src="require('../../assets/cartoonFigure.png')"></el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" @click.native="myCenter()">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check" @click.native="exitLogin()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { remoteCookies } from '@/utils/cookies'
import { mapGetters, mapActions } from 'vuex'
import pathToRegexp from 'path-to-regexp'
export default {
  computed: {
    ...mapGetters(['sidebar']),
  },
  data() {
    return {
      matched: [],
    }
  },
  watch: {
    $route(route) {
      this.getBreadcrumb()
    },
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    ...mapActions('sidebar', ['toggleSidebar']),
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      // if (matched.length <= 0) {
      //   matched = [{ path: '/', meta: { title: '首页' } }].concat(matched)
      // }
      this.matched = matched
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    //关闭打开侧边栏
    getSide() {
      this.toggleSidebar()
    },
    pathCompile(path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    goPath(item) {
      // console.log(item.path, this.matched)
      // if (
      //   this.$route.fullPath === item.path &&
      //   item.path === this.matched[0].path
      // ) {
      //   return
      // }
      const { redirect, path } = item
      // if (redirect) {
      //   this.$router.push(redirect)
      //   return
      // }
      this.$router.push(path)
    },

    exitLogin(){
      remoteCookies()//清除
      this.$router.push('/login')
    },
    myCenter(){
      this.$message({
          showClose: true,
          message: '暂无功能',
          type: 'success'
        });
    }
  },
}
</script>
<style scoped lang="scss">
.app-header {
  height: 50px;
  flex: 1;
  /* overflow: hidden; */
  /* position: relative; */
  background: #fff;
  -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  /* top: 0; */
  line-height: 50px;
  padding: 2px 0;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  .header_left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 15px;
    flex: 1;
    .right {
      margin-left: 10px;
    }
    .right span {
      cursor: pointer;
    }
    .right span:hover {
      color: rgb(64, 158, 255);
    }
    .active {
      color: #ccc;
    }
  }
  .header_right{
    position: fixed;
    right: 0;
    top: 0;
    // width: 200px;
    min-width: 50px;
    height: 50px;
    padding:2px;
    // background-color: gray;
  }
}
</style>
