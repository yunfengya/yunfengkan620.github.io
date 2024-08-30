import Layout from "@/layout/index.vue";
import Vue from "vue";
import Router from "vue-router";
import { adaikaifa } from "./modules/adaikaifa.js";
import { admin } from "./modules/admin";
import { chart } from "./modules/chart";
import { Project } from "./modules/project";
import { jsPlumb } from "./modules/jsPlumb";
import { keyProject } from "./modules/keyProject";
Vue.use(Router);
export const adminRouter = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/pages/home/index"),
        name: "home",
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/pages/login/index"),
    hidden: true,
  },
];
export const routerPath = [
  ...adaikaifa,

  ...Project,
  ...admin,
  ...keyProject,
  ...chart,
  ...jsPlumb,
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
const router = createRouter();
export default router;
