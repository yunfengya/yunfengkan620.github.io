import Layout from "@/layout/index.vue";

export const cssGongNeng = [
  {
    path: "/cssGongNeng",
    component: Layout,
    name: "cssGongNeng",
    redirect: '/cssGongNeng/css001',
    meta: {
      title: "css功能",
      icon: "el-icon-view",
    },
    children: [
      {
        path: "/cssGongNeng/css001",
        component: () => import("@/pages/cssGongNeng/css001.vue"),
        meta: {
          title: "001跑马灯",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/cssGongNeng/css002",
        component: () => import("@/pages/cssGongNeng/css002.vue"),
        meta: {
          title: "002小球运动",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/cssGongNeng/css003",
        component: () => import("@/pages/cssGongNeng/css003.vue"),
        meta: {
          title: "003文字分割",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/cssGongNeng/css004",
        component: () => import("@/pages/cssGongNeng/css004.vue"),
        meta: {
          title: "004鼠标特效",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/cssGongNeng/css005",
        component: () => import("@/pages/cssGongNeng/css005.vue"),
        meta: {
          title: "005手写签名",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/cssGongNeng/css006",
        component: () => import("@/pages/cssGongNeng/css006.vue"),
        meta: {
          title: "006轮播3D",
          icon: "el-icon-star-on",
        },
      },
      // 
      {
        path: "/cssGongNeng/zdaikaifa",
        component: () => import("@/pages/cssGongNeng/zdaikaifa.vue"),
        meta: {
          title: "待开发",
          icon: "el-icon-star-on",
        },
      },
    ],
  },
];
