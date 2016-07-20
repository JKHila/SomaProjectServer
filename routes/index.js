var express = require('express');
var indexController = require('../controllers/index');
var index = express.Router();

index.get('/', indexController.index);
index.post('/register', indexController.regist);
index.post('/unregister', indexController.unregister);
index.post('/send', indexController.send_push);

module.exports = index;