import Layout from "@/layout/index.vue";

export const threejs = [
  {
    path: "/threejs",
    component: Layout,
    name: "threejs",
    redirect: '/threejs/exe001',
    meta: {
      title: "3Dthreejs",
      icon: "el-icon-video-camera",
    },
    children: [
      {
        path: "/threejs/exe001",
        component: () => import("@/pages/threejs/exe001/index.vue"),
        meta: {
          title: "demo",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/threejs/exe002",
        component: () => import("@/pages/threejs/exe002/index.vue"),
        meta: {
          title: "案例2机房",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/threejs/exe003",
        component: () => import("@/pages/threejs/exe003/index.vue"),
        meta: {
          title: "案例3机房修改",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/threejs/exe004",
        component: () => import("@/pages/threejs/exe004/index.vue"),
        meta: {
          title: "案例4可视化大屏",
          icon: "el-icon-star-on",
        },
      },
    ],
  },
];
