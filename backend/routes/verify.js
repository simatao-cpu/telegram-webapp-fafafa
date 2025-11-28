// backend/routes/verify.js
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

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

router.post('/verify', express.json(), (req, res) => {
  try {
    // 兼容不同前端传参形式：
    // - { initData: "a=1&b=2..." }
    // - { initDataObj: { a: '1', b: '2', hash: '...' } }
    // - raw object in body
    let initDataObj = null;
    if (req.body && typeof req.body === 'object') {
      if (req.body.initDataObj && typeof req.body.initDataObj === 'object') {
        initDataObj = req.body.initDataObj;
      } else if (req.body.initData && typeof req.body.initData === 'string') {
        initDataObj = parseInitDataString(req.body.initData);
      } else {
        // 如果 body 本身就是解析过的对象（某些请求会直接发 object）
        initDataObj = req.body;
      }
    } else if (typeof req.body === 'string') {
      initDataObj = parseInitDataString(req.body);
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      return res.status(500).json({ ok: false, reason: 'TELEGRAM_BOT_TOKEN not set' });
    }

    if (!initDataObj || !initDataObj.hash) {
      return res.status(400).json({ ok: false, reason: 'missing initData or hash' });
    }

    const ok = checkInitData(initDataObj, botToken);
    if (!ok) return res.status(401).json({ ok: false, reason: 'invalid initData (hash mismatch)' });

    // 验证通过
    return res.json({ ok: true, data: initDataObj });
  } catch (err) {
    console.error('verify error', err);
    return res.status(500).json({ ok: false, reason: 'server error' });
  }
});

module.exports = router;
