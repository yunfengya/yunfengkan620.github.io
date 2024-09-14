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
        component: () => import("@/pages/threejs/exeOne.vue"),
        meta: {
          title: "案例1",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/threejs/exeTwo",
        component: () => import("@/pages/threejs/exeTwo.vue"),
        meta: {
          title: "案例2",
          icon: "el-icon-star-on",
        },
      },
    ],
  },
];
