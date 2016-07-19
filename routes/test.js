var express = require('express');
var testController = require('../controllers/test');
var test = express.Router();

test.get('/get',testController.testget);
test.post('/post',testController.testpost);

module.exports = test;