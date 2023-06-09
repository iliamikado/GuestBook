const express = require('express');
const router = express.Router();
const dbManager = require('../dbManager');

router.post('/', function(req, res) {
    const {login, password} = req.body;

    dbManager.userExist(login).then(exist => {
        if (exist) {
            res.send({status: 400, message: 'Login is already using'});
        } else {
            dbManager.addUser({login, password}).then((user_id) => {
                res.send({status: 200, message: 'User added', user_id});
            });
        }
    })
});

router.post('/login', function(req, res) {
    const {login, password} = req.body;
    dbManager.userLogin(login, password).then(user_id => {
        if (user_id) {
            res.send({status: 200, message: 'Login successfuly', user_id});
        } else {
            res.send({status: 400, message: 'Wrong login or password'});
        }
    })
});

module.exports = router;