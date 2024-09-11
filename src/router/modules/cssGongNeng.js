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
