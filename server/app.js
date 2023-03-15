const express = require('express');
const fileManager = require('./fileManager');
const posts = require('./routes/posts');

const app = express();
const port = 3001;

app.use(express.json());
app.use('/posts', posts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});