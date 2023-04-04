const express = require('express');
const router = express.Router();
const dbManager = require('../dbManager');


router.get('/', function(req, res) {
    dbManager.getPosts().then(data => {
        res.send(data);
    })
});

router.post('/', function(req, res) {
    try {
        dbManager.addPost(req.body);
        res.send({status: 200});
    } catch {
        res.send({status: 500});
    }
});

module.exports = router;