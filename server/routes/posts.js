const express = require('express');
const router = express.Router();
const fileManager = require('../fileManager');


router.get('/', function(req, res) {
  res.send(fileManager.getPosts());
});

router.post('/', function(req, res) {
    try {
        fileManager.addPost(req.body);
        res.send({status: 200});
    } catch {
        res.send({status: 500});
    }
});

module.exports = router;