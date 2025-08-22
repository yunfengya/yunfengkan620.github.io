let obj={
    result:{
        dataList:[]
    }
}


// 
let dataList = [
//   {
//     date: "2016-05-02",
//     name: "王小虎",
//     address: "上海市普陀区金沙江路 1518 弄",
//   },
];
dataList=obj.result.dataList??[]

let departList=[]
dataList.forEach(item=>{
    departList.push(item.o_stext)
})
departList=new Set(departList)

export const List=dataList;
export const departmentList=departList;
