<template>
  <div class="contain_box">
    <div class="tabDiv">
        <el-table border :row-class-name="tableRowClassName" :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="data" width=""> </el-table-column>
            <el-table-column prop="name" label="name" width=""> </el-table-column>
            <el-table-column prop="address" label="adress"> </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "ffff",
          address: "金沙江",
        },
        {
          date: "2016-05-04",
          name: "ffff",
          address: "金沙江",
        },
        {
          date: "2016-05-01",
          name: "ffff",
          address: "金沙江",
        },
        {
          date: "2016-05-03",
          name: "ffff",
          address: "金沙江",
        },
      ],
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    tableRowClassName({ row, rowIndex }) {
        if (rowIndex % 2 == 0) {
            return "evenClass";
        } else {
            return "oddClass";
        }
        return "";
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/table.scss";
/* 容器样式 */
.contain_box {
  width: 100%;
  height: 100%;
  /* 外框样式 */
}
</style>
