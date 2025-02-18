// 导入api.js中的callApi函数
import { callApi } from '@/api/fatp_api.js';

// 你应该从某处获取这个token
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjU3ZDk0YmMxLWE2YWUtNDhmMi1hYjVhLTNjNDZlY2NkM2Q1ZCJ9.cNVIibnhWtgtrORU25VpwtmII4BSEywDuUsoarJ-3C_KzPyWulOmgpjVX0RanOiwp0Dw5KPjgqHZYoMaKCz1hA'; 

// 查询列表
export async function fatp_activityRanking(query) {
  // 定义接口URL、参数和token
  const endpoint = 'http://10.190.196.161:8301/peopleManagement/userActivity/activityRanking';
  const params = {
      // date: '2025-02-17',
      // type: '0'
      // ... 其他参数
      ...query
  };
  const method = 'get'; // 或者'GET', 'PUT', 'DELETE'等
  const timeout = 10000; // 10秒超时
  const responseType = 'json'; // 或者'blob'  'json'
  try {
      // 接口返回数据 调用封装好的接口函数
      const data = await callApi(endpoint, params, token, method, timeout, responseType);
      // 处理响应数据
      console.log(data);
      return data
  } catch (error) {
      // 处理错误
      console.error('There was a problem fetching the data:', error);
  }
}