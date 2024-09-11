import Layout from "@/layout/index.vue";

export const echart = [
  {
    path: "/echart",
    component: Layout,
    name: "echart",
    redirect: '/echart/echart001',
    meta: {
      title: "echart",
      icon: "el-icon-star-on",
    },
    children: [
      {
        path: "/echart/echart001",
        component: () => import("@/pages/echart/echart001.vue"),
        meta: {
          title: "echart001",
          icon: "el-icon-star-on",
        },
      },
      {
        path: "/echart/echart002",
        component: () => import("@/pages/echart/echart002.vue"),
        meta: {
          title: "echart002",
          icon: "el-icon-star-on",
        },
      },
    ],
  },
];
