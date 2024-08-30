import Layout from "@/layout/index.vue";
export const Project = [
  {
    path: "/projectlist",
    component: Layout,
    redirect: "/projectlist/table",
    name: "projectlist",
    meta: {
      title: "项目列表",
      icon: "el-icon-folder-checked",
    },
    children: [
      {
        path: "/projectlist/table",
        component: (resolve) => require(["@/pages/table/index.vue"], resolve),
        name: "table",
        meta: {
          title: "表格",
          icon: "el-icon-tickets",
        },
      },
      {
        path: "/projectlist/bubbleTable",
        component: () => import("@/pages/table/bubbleTable/index.vue"),
        name: "bubbleTable",
        meta: {
          title: "气泡表格",
          icon: "el-icon-tickets",
        },
      },
      {
        path: "/projectlist/margeTable",
        component: (resolve) =>
          require(["@/pages/margeTable/index.vue"], resolve),
        name: "margeTable",
        meta: {
          title: "合并表格",
          icon: "el-icon-tickets",
        },
      },
      {
        path: "/projectlist/project",
        component: () => import("@/pages/project"),
        name: "project",
        meta: {
          title: "项目",
          icon: "el-icon-folder-add",
        },
      },
      {
        path: "/projectlist/label",
        component: () => import("@/pages/label"),
        name: "label",
        meta: {
          title: "标签",
          icon: "el-icon-folder-add",
        },
      },
      {
        path: "/projectlist/echarts",
        component: () => import("@/pages/echarts"),
        name: "echarts",
        meta: {
          title: "图形",
          icon: "el-icon-magic-stick",
        },
      },
      {
        path: "/projectlist/editor",
        component: () => import("@/pages/editor"),
        name: "editor",
        meta: {
          title: "富文本",
          icon: "el-icon-s-order",
        },
      },
      {
        path: "/projectlist/projectlists",
        name: "projectlists",
        component: () => import("@/pages/projectList/index"),
        hidden: true,
      },
      {
        path: "/projectlist/list",
        name: "list",
        component: () => import("@/pages/list/index"),
        meta: {
          title: "列表滚动",
          icon: "el-icon-s-order",
        },
      },
      {
        path: "/projectlist/select",
        name: "select",
        component: () => import("@/pages/select/index"),
        meta: {
          title: "自适应选择",
          icon: "el-icon-s-order",
        },
      },
    ],
  },
];
