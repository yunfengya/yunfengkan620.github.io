import Layout from "@/layout/index.vue";

export const adaikaifaAll = [
  {
    path: "/adaikaifaAll",
    component: Layout,
    name: "adaikaifaAll",
    redirect: '/adaikaifaAll/daikaifaOne',
    meta: {
      title: "待开发多页菜单",
      icon: "el-icon-star-on",
    },
    children: [
      {
        path: "/adaikaifaAll/daikaifaOne",
        component: () => import("@/pages/adaikaifaAll/daikaifaOne.vue"),
        meta: {
          title: "待开发1",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/adaikaifaAll/daikaifaTwo",
        component: () => import("@/pages/adaikaifaAll/daikaifaTwo.vue"),
        meta: {
          title: "待开发2",
          icon: "el-icon-star-on",
        },
      },
    ],
  },
];
