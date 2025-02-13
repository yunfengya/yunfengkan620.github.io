// import request from '@/utils/axios'
// export function usuallyApi() {
//   // 获取特殊token
//   const token = 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjQ0NjNjYzU0LTE4NjAtNDZlMy1iZTBmLWUzYjQ5MGQ1NDAxZCJ9.Ok5hKZyLWPZwLe6KHL8kZWVR4-FfcC5bJCoMuCBxDOd9ChAlgUnR3lgHNyr_pIDALGsqK0c6Gg1KKNVASvwQtA';
//   let query={
//     filename: "Cmesh 飞达调试指南.pptx",
//     filepath: "https://lzisilon.luxsan-mes.local:9000/fatp/library/20241011190445/Cmesh 飞达调试指南.pptx"
//   }
//   // 在请求配置中添加headers
//   const config = {
//     url: "file/getfile",
//     method: "post",
//     data: query,
//     // responseType: 'arraybuffer',
//     responseType: 'blob',
//     timeout: 20000,
//     headers: {
//       // 假设你的后端需要'Authorization'头来接收token
//       'Authorization': `Bearer ${token}`
//     }
//   };

//   // 发送请求
//   return request(config);
// }
