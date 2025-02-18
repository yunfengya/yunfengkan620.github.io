// api.js

// 定义一个异步函数来封装接口调用
export async function callApi(endpoint, params, token, method = 'GET', timeout = 5000, responseType = 'json') {
    // 根据请求类型处理参数
    let body;
    if (method.toUpperCase() === 'GET') {
        // 将参数对象转换为URL查询字符串
        const queryString = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
        endpoint += `?${queryString}`;
    } else {
        // 对于非GET请求，将参数对象转换为JSON字符串作为请求体
        body = JSON.stringify(params);
    }

    // 定义请求头对象
    const headers = {
        'Content-Type': 'application/json'
    };
    // if(responseType === 'blob'){
    //   headers['Accept'] = 'application/octet-stream';
    // }
    // 如果提供了token，则将其添加到请求头中
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // 创建一个超时Promise
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
    );

    try {
        // 使用fetch发送请求，并与超时Promise进行竞赛
        const response = await Promise.race([
            fetch(endpoint, {
                method: method.toUpperCase(),
                headers: headers,
                body: body,
                // 如果responseType是'blob'，则设置相应的响应类型
                ...(responseType === 'blob' ? { responseType: 'blob' } : {})
            }),
            timeoutPromise
        ]);

        // 检查响应状态码
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 根据responseType处理响应数据
        let data;
        if (responseType === 'blob') {
            data = await response.blob();
        } else {
            data = await response.json();
        }

        // 返回响应数据
        return data;
    } catch (error) {
        // 抛出错误，以便在调用处处理
        throw error;
    }
}

// 组件中 使用方式
{/* <template>
  <!-- ... 你的模板代码 ... -->
</template>

<script>
// 导入api.js中的callApi函数
import { callApi } from './api.js';

export default {
  // ... 你的Vue组件选项 ...
  methods: {
    async fetchData() {
      // 定义接口URL、参数、token、请求类型、超时时间和响应类型
      const endpoint = 'https://api.example.com/your-endpoint';
      const params = {
        key1: 'value1',
        key2: 'value2'
        // ... 其他参数
      };
      const token = 'your-token-here'; // 你应该从某处获取这个token
      const method = 'POST'; // 或者'GET', 'PUT', 'DELETE'等
      const timeout = 10000; // 10秒超时
      const responseType = 'json'; // 或者'blob'

      try {
        // 调用封装好的接口函数
        const data = await callApi(endpoint, params, token, method, timeout, responseType);

        // 处理响应数据
        console.log(data);
      } catch (error) {
        // 处理错误
        console.error('There was a problem fetching the data:', error);
      }
    }
  },
  // ... 其他选项 ...
};
</script> */}
