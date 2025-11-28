async function verifyInitData(initData) {
  const url = 'https://telegram-webapp-fafafa.onrender.com/api/verify';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData: initData })
  });
  return res.json();
}

window.verifyInitData = verifyInitData;
