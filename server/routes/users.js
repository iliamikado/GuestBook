const express = require('express');
const router = express.Router();
const fileManager = require('../fileManager');

router.post('/', function(req, res) {
    const {login, password} = req.body;
    if (fileManager.userExist(login)) {
        res.send({status: 400, message: 'Login is already using'});
    } else {
        fileManager.addUser({login, password});
        res.send({status: 200, message: 'User added'});
    }
});

router.post('/login', function(req, res) {
    const {login, password} = req.body;
    if (fileManager.userLogin(login, password)) {
        res.send({status: 200, message: 'Login successfuly'});
    } else {
        res.send({status: 400, message: 'Wrong login or password'});
    }
});

module.exports = router;