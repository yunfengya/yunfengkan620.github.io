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
          title: "001css集合",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/cssGongNeng/css002",
        component: () => import("@/pages/cssGongNeng/css002.vue"),
        meta: {
          title: "002css功能vue",
          icon: "el-icon-star-on",
        },
      },
      // 
      {
        path: "/cssGongNeng/zjiekou",
        component: () => import("@/pages/cssGongNeng/zjiekou.vue"),
        meta: {
          title: "接口调用",
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
      // 
      {
        path: "/cssGongNeng/zJuanWang",
        component: () => import("@/pages/cssGongNeng/zJuanWang.vue"),
        meta: {
          title: "zJuanWang",
          icon: "el-icon-star-on",
        },
      },
    ],
  },
];
