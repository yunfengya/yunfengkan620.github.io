<template>
    <div class="contain_box">
        <el-row :gutter="10">
            <el-col :span="8">
                <el-select v-model="selectDepartValue" multiple placeholder="请选择">
                    <el-option
                        v-for="item in departmentList"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
                <el-button class="" icon="" size="mini" @click="search()">查询</el-button>
                <el-button class="" icon="" size="mini" @click="clear()">清空</el-button>
            </el-col>
            <el-col :span="16">
                <el-table :data="tableData" class="table_dom" style="width: 100%;height:100%;font-size:12px;" height="85vh" :default-sort="{ prop: 'cc', order: 'descending' }">

                    <el-table-column label="序号" prop="" type="index" align="center"></el-table-column>

                    <el-table-column prop="cpf02" label="name" sortable width="" align="center">
                        <template slot-scope="scope">
                            {{scope.row.cpf02||'--'}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="cc" label="time" sortable width="" align="center">
                        <template slot-scope="scope">
                            <el-popover placement="top" title="" width="200" trigger="hover" popper-class="popperClass" >
                                <div class=""> 内容:{{ scope.row }} </div>
                                <span slot="reference">
                                    {{scope.row.cc}}
                                </span>
                            </el-popover>
                        </template>
                    </el-table-column>

                    <el-table-column prop="o_stext" label="分布" sortable width="" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.o_stext||'--'}}
                        </template>
                    </el-table-column>

                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {departmentList,List} from "./zJuanWang.js"
export default {
    name: "index",
    components: {},
    data() {
        return {
            selectDepartValue:[],
            // 遮罩层
            loading: true,
            departmentList: [],
            tableData: [],
        };
    },
    watch: {},
    created() { },
    mounted() {
        this.departmentList = departmentList;
    },
    methods: {
        search(){
            // 过滤函数
            this.tableData = List.filter(item => this.selectDepartValue.includes(item.o_stext));
        },
        clear(){
            this.selectDepartValue = [];
            this.tableData = [];
        },
    },
};
</script>

<style scoped lang="scss">
.contain_box {
    width: 100%;
    height: 100%;
    overflow: auto;

    .table_dom{
        ::v-deep td{
            padding: 0px 0px !important;
        }
    }
}
</style>
