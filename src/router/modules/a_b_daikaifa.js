import Layout from "@/layout/index.vue";

export const a_b_daikaifa = [
  {
    path: "/a_b_daikaifa",
    component: Layout,
    name: "a_b_daikaifa",
    redirect: '/a_b_daikaifa/index',
    meta: {
      title: "待开发",
      icon: "el-icon-star-on",
    },
    children: [
      {
        path: "/a_b_daikaifa/index",
        component: () => import("@/pages/a_b_daikaifa/index.vue"),
        meta: {
          title: "待开发单页菜单",
          icon: "el-icon-star-on",
        },
      },
    ],
  },
];
