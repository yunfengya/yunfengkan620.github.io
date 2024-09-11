/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// echarts文字
export function setFontSize(val,initWidth = 1920) {
    let nowClientWidth = document.documentElement.clientWidth;
    return val * (nowClientWidth / initWidth);
}

//1 按照number排序

// let arrList = [
//     { name: 'zoop', age: 3,time:'2023-04-11' },
//     { name: 'gpp', age: 18,time:'2023-04-07' },
// ];
function compareNumber(property,bol) {
    return function (a, b) {
        var val1 = a[property];
        var val2 = b[property];
        if(bol){
            // 升序
            return val1 - val2
        }else{
            // 降序
            return val2 - val1
        }
    }
}
// arr要排序的数据  val根据那个键排序  bol为true实升序为false时降序
export function objValNumberSort(arr,val,bol){
    return arr.sort(compareNumber(val,bol))
}
// objValNumberSort(arrList,'age',true)
// console.log(arrList.sort(compareNumber('age',true)))
// console.log(arrList.sort(compareNumber('age',false)))





//2对象中的时间字符串排序

// let dataList = [
//         { name: 'zoop', age: 3,time:'2023-04-11' },
//         { name: 'gpp', age: 18,time:'2023-04-07' },
//     ];
function compareString(property, bol) {
    // console.log(property);
    return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        if (bol) {
            // 升序
            return Date.parse(value1) - Date.parse(value2);
        } else {
            // 降序
            return Date.parse(value2) - Date.parse(value1)
        }
    }
}
export function objValStringSort(arr,val,bol){
    // console.log(bol);
    return arr.sort(compareString(val, bol))
}
// objValStringSort(dataList,'time',true)
// objValNumberSort(dataList,'time',true)
// console.log(dataList.sort(compareString("time", true)))
// console.log(dataList.sort(compareString("time", false)))


// 获取日期周数  dateTime传的参数是字符串形式（’2021-02-28‘）
// function getWeek (dateTime) {
//     let temptTime = new Date(dateTime)
//     let weekday
//     // 如果是周日，则设为7
//     if (temptTime.getDay() == 6) {
//       weekday = 7
//     } else {
//       weekday = temptTime.getDay()
//     }
//     temptTime.setDate(temptTime.getDate() - weekday + 6)
//     let firstDay = new Date(temptTime.getFullYear(), 0, 1)
//     let dayOfWeek = firstDay.getDay()
//     let spendDay = 1
//     if (dayOfWeek != 0) {
//       spendDay = 7 - dayOfWeek + 1
//     }
//     firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay)
//     let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000)
//     let result = Math.ceil(d / 7)
//     return result + 1
//   }



// 根据第几周，获取当年的开始日期和结束日期 (周日 到 周六)
export function getChangeDate(year,week) {
    
    //获取周开始日期
    const date1 = new Date(year, 0, 4);
    date1.setDate(date1.getDate() - date1.getDay());
    date1.setTime(date1.getTime() + 7 * 86400000 * (week - 1));
    let year1 = date1.getFullYear();
    let month1 = date1.getMonth() + 1;
    if (month1 >= 1 && month1 <= 9) {
        month1 = "0" + month1;
    }
    let dates1 = date1.getDate();
    if (dates1 >= 1 && dates1 <= 9) {
        dates1 = "0" + dates1;
    }
    let startDate = year1 + "-" + month1 + "-" + dates1;

    //获取周结束日期
    const date = new Date(year, 0, 4);
    date.setDate(date.getDate() - date.getDay());
    date.setTime(date.getTime() + 7 * 86400000 * week - 1);
    let year2 = date.getFullYear();
    let month2 = date.getMonth() + 1;
    if (month2 >= 1 && month2 <= 9) {
        month2 = "0" + month2;
    }
    let dates2 = date.getDate();
    if (dates2 >= 1 && dates2 <= 9) {
        dates2 = "0" + dates2;
    }
    let endDate = year2 + "-" + month2 + "-" + dates2;

    return [startDate,endDate];
}



// 获取指定 月份的 月初日期 月末日期
// 查询月份开始结束
//开始日期
function getFirstDayOfMonth(year, month) {
    // return new Date(year, month-1, 1);
    let data = new Date(year, month - 1, 1);
    return (
      data.getFullYear() +
      "-" +
      (data.getMonth() + 1 > 9
        ? data.getMonth() + 1
        : "0" + (data.getMonth() + 1)) +
      "-" +
      (data.getDate() > 9 ? data.getDate() : "0" + data.getDate())
    );
  }
  //结束日期
function getLastDayOfMonth(year, month) {
    let data = new Date(year, month, 0);
    return (
        data.getFullYear() +
        "-" +
        (data.getMonth() + 1 > 9
        ? data.getMonth() + 1
        : "0" + (data.getMonth() + 1)) +
        "-" +
        (data.getDate() > 9 ? data.getDate() : "0" + data.getDate())
    );
}
  
export function getMonthStartToEnd(year, month){ 
    return [getFirstDayOfMonth(year, month),getLastDayOfMonth(year, month)]
}
  
