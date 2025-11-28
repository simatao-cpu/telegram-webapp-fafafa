// backend/server.js
const express = require('express');
const app = express();
const verifyRouter = require('./routes/verify');

app.use(express.json());
app.get('/', (req, res) => res.send('Backend running'));
app.use('/api', verifyRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
