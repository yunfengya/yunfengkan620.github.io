import Layout from "@/layout/index.vue";

export const threejs = [
  {
    path: "/threejs",
    component: Layout,
    name: "threejs",
    redirect: '/threejs/exeOne',
    meta: {
      title: "3Dthreejs",
      icon: "el-icon-video-camera",
    },
    children: [
      {
        path: "/threejs/exeOne",
        component: () => import("@/pages/threejs/exeOne/index.vue"),
        meta: {
          title: "demo",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/threejs/exeTwo",
        component: () => import("@/pages/threejs/exeTwo/index.vue"),
        meta: {
          title: "案例1机房",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/threejs/exeThree",
        component: () => import("@/pages/threejs/exeThree/index.vue"),
        meta: {
          title: "案例1机房修改",
          icon: "el-icon-star-on",
        },
      },
    ],
  },
];
