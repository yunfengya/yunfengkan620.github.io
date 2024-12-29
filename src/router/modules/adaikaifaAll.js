import Layout from "@/layout/index.vue";

export const adaikaifaAll = [
  {
    path: "/adaikaifaAll",
    component: Layout,
    name: "adaikaifaAll",
    redirect: '/adaikaifaAll/daikaifaOne',
    meta: {
      title: "待开发多页菜单",
      icon: "el-icon-loading",
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
      {
        path: "/adaikaifaAll/daikaifaThree",
        component: () => import("@/pages/adaikaifaAll/daikaifaThree.vue"),
        meta: {
          title: "待开发3",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/adaikaifaAll/daikaifaFour",
        component: () => import("@/pages/adaikaifaAll/daikaifaFour.vue"),
        meta: {
          title: "待开发4",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/adaikaifaAll/daikaifaFive",
        component: () => import("@/pages/adaikaifaAll/daikaifaFive.vue"),
        meta: {
          title: "待开发5",
          icon: "el-icon-star-on",
        },
      },
      // 
      {
        path: "/adaikaifaAll/daikaifaSix",
        component: () => import("@/pages/adaikaifaAll/daikaifaSix.vue"),
        meta: {
          title: "待开发6",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/adaikaifaAll/daikaifaSeven",
        component: () => import("@/pages/adaikaifaAll/daikaifaSeven.vue"),
        meta: {
          title: "待开发7",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/adaikaifaAll/daikaifaEight",
        component: () => import("@/pages/adaikaifaAll/daikaifaEight.vue"),
        meta: {
          title: "待开发8",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/adaikaifaAll/daikaifaNign",
        component: () => import("@/pages/adaikaifaAll/daikaifaNign.vue"),
        meta: {
          title: "待开发9",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/adaikaifaAll/daikaifaTen",
        component: () => import("@/pages/adaikaifaAll/daikaifaTen.vue"),
        meta: {
          title: "待开发10",
          icon: "el-icon-star-on",
        },
      },
    ],
  },
];
