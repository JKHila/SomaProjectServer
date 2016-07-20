var index = require('../models/index.js')
var gcm = require('node-gcm');

// push를 보내는 페이지
exports.index = function(req, res){
	res.render('index', { title: 'GCM Push' });
};

// 푸쉬 등록
exports.regist = function(req, res){
	console.log('register id=', req.body.regId);
	index.registerId(req.body.regId, function (err, result) {
		if (err) {
			console.error(err);
			res.end();
		} else {
			res.end();
		}
	});
};

// 푸쉬 등록 해제
exports.unregister = function(req, res){
	console.log('unregister id=', req.body.unregId);
	index.unregisterId(req.body.unregId, function (err, result) {
		if (err) {
			console.error(err);
			res.end();
		} else {
			res.end();
		}
	});
};

// 푸쉬 보내기
exports.send_push = function(req, res){
	index.getregisterId(function (err, results) {
		console.log(results);
		if (err) {
			console.error(err);
		} else {
			var message = new gcm.Message();
			var sender = new gcm.Sender('AIzaSyCSasOLlxuW7osEeVDoOXMkA2xQlaO0u58');
			var message1 = req.body.message1;
			var message2 = req.body.message2;
			message.addData('key1', message1);
			message.addData('key2', message2);
			message.collapseKey = 'demo';
			message.delayWhileIdle = true;
			message.timeToLive = 3;

			for (var i = 0; i < results.length; i++) {
				sender.sendNoRetry(message, results[i].id, function (err, result) {
					console.log('result', result);
				});
			}
			res.redirect('/');
		}
	});
};