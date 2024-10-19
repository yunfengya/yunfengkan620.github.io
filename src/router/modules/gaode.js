import Layout from "@/layout/index.vue";

export const gaode = [
  {
    path: "/gaode",
    component: Layout,
    name: "gaode",
    redirect: '/gaode/exe001',
    meta: {
      title: "高德地图",
      icon: "el-icon-video-camera",
    },
    children: [
      {
        path: "/gaode/exe001",
        component: () => import("@/pages/gaode/exe001/index.vue"),
        meta: {
          title: "demo",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/gaode/exe002",
        component: () => import("@/pages/gaode/exe002/index.vue"),
        meta: {
          title: "案例2点标记",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/gaode/exe003",
        component: () => import("@/pages/gaode/exe003/index.vue"),
        meta: {
          title: "案例3多边形",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/gaode/exe004",
        component: () => import("@/pages/gaode/exe004/index.vue"),
        meta: {
          title: "案例4搜索",
          icon: "el-icon-star-on",
        },
      },
      
    ],
  },
];
