/*
  示例：将 Telegram WebApp 提供的 initData 发给后端验证
  在 index.html 中引入并使用：
    verifyInitData(window.Telegram.WebApp.initData).then(console.log)
*/
async function verifyInitData(initData) {
  const url = 'http://localhost:3000/api/verify'; // 本地调试用，生产改为后端域名
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData: initData })
  });
  return res.json();
}
window.verifyInitData = verifyInitData;
