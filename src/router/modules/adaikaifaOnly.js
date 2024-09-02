import Layout from "@/layout/index.vue";

export const adaikaifaOnly = [
  {
    path: "/adaikaifaOnly",
    component: Layout,
    name: "adaikaifaOnly",
    redirect: '/adaikaifaOnly/index',
    meta: {
      title: "待开发",
      icon: "el-icon-star-on",
    },
    children: [
      {
        path: "/adaikaifaOnly/index",
        component: () => import("@/pages/adaikaifaOnly/index.vue"),
        meta: {
          title: "待开发单页菜单",
          icon: "el-icon-star-on",
        },
      },
    ],
  },
];
