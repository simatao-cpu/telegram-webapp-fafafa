const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// 解析 initData 字符串 (a=1&b=2... -> {a:1, b:2})
function parseInitDataString(s) {
  return s.split('&').reduce((acc, p) => {
    const [k, v] = p.split('=');
    acc[k] = decodeURIComponent(v || '');
    return acc;
  }, {});
}

function checkInitData(initDataObj, botToken) {
  const keys = Object.keys(initDataObj).filter(k => k !== 'hash').sort();
  const dataCheckArr = keys.map(k => `${k}=${initDataObj[k]}`);
  const dataCheckString = dataCheckArr.join('\n');
  const secret = crypto.createHash('sha256').update(botToken).digest();
  const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');
  return hmac === initDataObj.hash;
}

router.post('/verify', (req, res) => {
  let initDataObj = req.body.initDataObj  req.body.initData  req.body;
  if (typeof initDataObj === 'string') {
    initDataObj = parseInitDataString(initDataObj);
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    return res.status(500).json({ ok: false, reason: 'TELEGRAM_BOT_TOKEN not set' });
  }

  if (!initDataObj || !initDataObj.hash) {
    return res.status(400).json({ ok: false, reason: 'missing initData or hash' });
  }

  try {
    const ok = checkInitData(initDataObj, botToken);
    if (!ok) return res.status(401).json({ ok: false, reason: 'invalid initData (hash mismatch)' });
    return res.json({ ok: true, data: initDataObj });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, reason: 'server error' });
  }
});

module.exports = router;
