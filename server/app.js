const express = require('express');
const cors = require('cors');
const posts = require('./routes/posts');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/posts', posts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});