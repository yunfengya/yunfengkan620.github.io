import Layout from "@/layout/index.vue";

export const adaikaifa = [
  {
    path: "/adaikaifaAll",
    component: Layout,
    name: "adaikaifaAll",
    meta: {
      title: "待开发菜单",
      icon: "el-icon-s-home",
    },
    children: [
      {
        path: "/adaikaifaAll/daikaifaOne",
        component: () => import("@/pages/adaikaifaAll/daikaifaOne.vue"),
        meta: {
          title: "待开发1",
          icon: "el-icon-s-home",
        },
      },
      {
        path: "/adaikaifaAll/daikaifaTwo",
        component: () => import("@/pages/adaikaifaAll/daikaifaTwo.vue"),
        meta: {
          title: "待开发2",
          icon: "el-icon-s-home",
        },
      },
    ],
  },
];
