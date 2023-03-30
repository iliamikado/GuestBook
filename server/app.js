const express = require('express');
const cors = require('cors');
const posts = require('./routes/posts');
const users = require('./routes/users');
const fileManager = require('./fileManager');

const app = express();
const expressWs = require('express-ws')(app);
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/posts', posts);
app.use('/users', users);

app.ws('/posts_sync', function(ws, req) {

  fileManager.addWS(ws);

  ws.on('close', function(msg) {
    fileManager.removeWs(ws);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});