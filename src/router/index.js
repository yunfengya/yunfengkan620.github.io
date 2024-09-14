import Layout from "@/layout/index.vue";
import Vue from "vue";
import Router from "vue-router";
import { cssGongNeng } from "./modules/cssGongNeng.js";
import { echart } from "./modules/echart.js";
import { threejs } from "./modules/threejs.js";
import { adaikaifaAll } from "./modules/adaikaifaAll.js";
import { adaikaifaOnly } from "./modules/adaikaifaOnly";
import { admin } from "./modules/admin";
Vue.use(Router);
export const adminRouter = [
  // {
  //   path: "/",
  //   component: Layout,
  //   redirect: "/home",
  //   children: [
  //     {
  //       path: "/home",
  //       component: () => import("@/pages/home/index"),
  //       name: "home",
  //       meta: {
  //         title: "首页",
  //         icon: "el-icon-grape",
  //       },
  //     },
  //   ],
  // },
  {
    path: "/login",
    component: () => import("@/pages/login/index"),
    hidden: true,//设置不显示菜单
  },
];
export const routerPath = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/pages/home/index"),
        // hidden: true,//设置不显示菜单
        name: "home",
        meta: {
          title: "首页",
          icon: "el-icon-s-home",
        },
      },
    ],
  },
  ...cssGongNeng,
  ...echart,
  ...threejs,
  ...adaikaifaAll,
  ...adaikaifaOnly,

  ...admin,

  //404 layout页面
  {
    path: "/404",
    component: Layout,
    redirect: "/404",
    children: [
      {
        path: "/404",
        component: () => import("@/pages/error404/index"),
        // hidden: true,//设置不显示菜单
        name: "404",
        meta: {
          title: "404",
          icon: "el-icon-error",
        },
      },
    ],
  },
  // //404 整个页面
  // {
  //   path: "/404",
  //   component: () => import("@/pages/error404/index"),
  //   hidden: true,
  // },
  // 捕获所有未匹配的路由 404
  { 
    path: '/:pathMatch(.*)*', 
    component: () => import("@/pages/error404/index"),
    hidden: true, 
  } 
];
// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
const createRouter = () =>
  new Router({
    mode: 'history',// 去掉url中的#
    scrollBehavior: () => ({ y: 0 }),
    routes: adminRouter.concat(routerPath),
  });
// console.log(routerPath);
// console.log(adminRouter);
const router = createRouter();
export default router;