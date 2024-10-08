import Layout from "@/layout/index.vue";

export const chart = [
  {
    path: "/chart",
    component: Layout,
    name: "chart",
    redirect: '/chart/index',
    meta: {
      title: "关系图",
      icon: "el-icon-grape",
    },
    children: [
      {
        path: "/chart/index",
        component: () => import("@/pages/chart/index.vue"),
        meta: {
          title: "关系图1",
          icon: "el-icon-grape",
        },
      },
      {
        path: "/chart/chartlabel",
        component: () => import("@/pages/chart/chartLabel.vue"),
        meta: {
          title: "自定义插槽",
          icon: "el-icon-grape",
        },
      },
    ],
  },
];
