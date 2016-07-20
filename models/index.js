var config  = require('../config/config');

// 푸쉬 등록하기(사용자가 없다면)
exports.registerId = function (id, callback) {
	try {
		config.bridgePool.acquire(function (err, conn) {
			if (err) console.error('err index.registerId 1', err);
			// console.log('data', data);
			conn.query('INSERT INTO registid VALUES (?);', [id], function (err, result) {
				if (err) console.error('err index.registerId 2', err);
				callback(err, result);
			});
			config.bridgePool.release(conn); //이걸 안하면 반납이 안됨
		});
	} catch (err) {
		console.error('error :', err);
	}
};

// 푸쉬 등록 해제하기
exports.unregisterId = function (id, callback) {
	try {
		config.bridgePool.acquire(function (err, conn) {
			if (err) console.error('err index.unregisterId 1', err);
			// console.log('data', data);
			conn.query('DELETE FROM registid WHERE id=?;', [id], function (err, results) {
				if (err) console.error('err index.unregisterId 2', err);
				callback(err, results);
			});
			config.bridgePool.release(conn); //이걸 안하면 반납이 안됨
		});
	} catch (err) {
		console.error('error :', err);
	}
};

// GCM ID 받기
exports.getregisterId = function (callback) {
	try {
		config.bridgePool.acquire(function (err, conn) {
			if(err) console.error('err index.getregisterId 1', err);
			// console.log('data', data);
			conn.query('SELECT id FROM registid;', [], function (err, results) {
				if (err) console.error('err index.getregisterId 2', err);
				callback(err, results);
			});
			config.bridgePool.release(conn); //이걸 안하면 반납이 안됨
		});
	} catch (err) {
		console.error('error :', err);
	}
};