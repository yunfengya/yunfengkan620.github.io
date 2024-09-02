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
          title: "css001",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/cssGongNeng/css002",
        component: () => import("@/pages/cssGongNeng/css002.vue"),
        meta: {
          title: "css002",
          icon: "el-icon-star-on",
        },
      },
    ],
  },
];
