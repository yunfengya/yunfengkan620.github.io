/**
 * 版本检查工具
 * 功能：定期检查服务器版本，发现新版本时提示用户更新
 */

/**
 * 检查版本更新
 */
export const checkVersion = () => {
  // 版本检查功能
  const CURRENT_VERSION = "0.1.0"; // 从 package.json 中获取的版本号
  console.log("当前应用版本:", CURRENT_VERSION);
  // moock 接口  public中的 json文件
  fetch("/version.json?t=" + Date.now())
    .then((res) => res.json())
    .then(({ version }) => {
      console.log("public文件夹，服务器版本:", version);
      console.log("当前静态js 中版本:", CURRENT_VERSION);
      if (version !== CURRENT_VERSION) {
        // 弹出提示框，让用户选择是否刷新
        const refresh = confirm("检测到新版本，点击确定刷新页面");
        console.log("refresh", refresh);
        
        if (refresh) {
          window.location.reload(true);
        }
      }
    })
    .catch((err) => {
      console.error("版本检查失败:", err);
    });
};

/**
 * 启动版本检查
 * 立即检查一次，然后每10秒轮询一次
 */
export const startVersionCheck = () => {
  checkVersion(); // 立即检查一次
  setInterval(checkVersion, 10000); // 每10秒轮询一次
};
