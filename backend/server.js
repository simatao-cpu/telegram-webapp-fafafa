const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/verify');

app.use(express.json());

// 简易 CORS（开发用），生产请改为特定域名
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api', routes);

app.get('/', (req, res) => res.send('Backend running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on :${PORT}`));
