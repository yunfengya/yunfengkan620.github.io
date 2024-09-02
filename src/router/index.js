import Layout from "@/layout/index.vue";
import Vue from "vue";
import Router from "vue-router";
import { adaikaifaAll } from "./modules/adaikaifaAll.js";
import { admin } from "./modules/admin";
import { adaikaifaOnly } from "./modules/adaikaifaOnly";
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
  ...adaikaifaAll,
  ...adaikaifaOnly,

  ...admin,
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
console.log(routerPath);
console.log(adminRouter);
const router = createRouter();
export default router;
