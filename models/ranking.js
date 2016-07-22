var config = require('../config/config');
exports.getHighScore = function(nick_name, callback) {
    try {
        config.bridgePool.acquire(function(err, conn) {
            if (err) console.error('err ranking.getHighScore 1', err);
            conn.query('select score from user_table where nick_name=?;', [nick_name], function(err, results) {
                if (err) console.error('err ranking.getHighScore 2', err);
                callback(err, results);
            });
            config.bridgePool.release(conn);
        });
    } catch (err) {
        console.error('error :', err);
    }
}
exports.registerPlaytime = function(data, callback) {
    try {
        config.bridgePool.acquire(function(err, conn) {
            if (err) console.error('err ranking.registerplaytime 1', err);
            // console.log('data', data);
            conn.query('UPDATE user_table SET play_time=? WHERE nick_name=?;', data, function(err, results) {
                if (err) console.error('err ranking.registerplaytime 2', err);
                callback(err, results);
            });
            config.bridgePool.release(conn); //이걸 안하면 반납이 안됨
        });
    } catch (err) {
        console.error('error :', err);
    }
}
exports.registerEndtime = function(data, callback) {
    try {
        config.bridgePool.acquire(function(err, conn) {
            if (err) console.error('err ranking.registerendtime 1', err);
            // console.log('data', data);
            conn.query('UPDATE user_table SET end_time=now() WHERE nick_name=?;', data, function(err, result) {
                if (err) console.error('err ranking.registerendtime 2', err);
                callback(err, result);
            });
            config.bridgePool.release(conn); //이걸 안하면 반납이 안됨
        });
    } catch (err) {
        console.error('error :', err);
    }
}
exports.registerStarttime = function(data, callback) {
    try {
        config.bridgePool.acquire(function(err, conn) {
            if (err) console.error('err ranking.registerstarttime 1', err);
            // console.log('data', data);
            conn.query('UPDATE user_table SET start_time=now() WHERE nick_name=?;', data, function(err, result) {
                if (err) console.error('err ranking.registerstarttime 2', err);
                callback(err, result);
            });
            config.bridgePool.release(conn); //이걸 안하면 반납이 안됨
        });
    } catch (err) {
        console.error('error :', err);
    }
}
// 랭킹 등록하기(사용자가 없다면)
exports.registerScore = function(data, callback) {
    try {
        config.bridgePool.acquire(function(err, conn) {
            if (err) console.error('err ranking.registerScore 1', err);
            // console.log('data', data);
            conn.query('INSERT INTO user_table VALUES (?,?,now(),0,now());', data, function(err, result) {
                if (err) console.error('err ranking.registerScore 2', err);
                callback(err, result);
            });
            config.bridgePool.release(conn); //이걸 안하면 반납이 안됨
        });
    } catch (err) {
        console.error('error :', err);
    }
};

// 랭킹 업데이트하기
exports.updateScore = function(data, callback) {
    try {
        config.bridgePool.acquire(function(err, conn) {
            if (err) console.error('err ranking.updateScore 1', err);
            // console.log('data', data);
            conn.query('UPDATE user_table SET score=? WHERE nick_name=?;', data, function(err, results) {
                if (err) console.error('err ranking.updateScore 2', err);
                callback(err, results);
            });
            config.bridgePool.release(conn); //이걸 안하면 반납이 안됨
        });
    } catch (err) {
        console.error('error :', err);
    }
};

// 사용자가 있는지 확인
exports.checkUser = function(nick_name, callback) {
    try {
        config.bridgePool.acquire(function(err, conn) {
            if (err) console.error('err ranking.checkUser 1', err);
            // console.log('data', data);
            conn.query('SELECT COUNT(nick_name) AS cnt FROM user_table WHERE nick_name=?;', [nick_name], function(err, results) {
                if (err) console.error('err ranking.checkUser 2', err);
                callback(err, results);
            });
            config.bridgePool.release(conn); //이걸 안하면 반납이 안됨
        });
    } catch (err) {
        console.error('error :', err);
    }
};

// 점수 내역 받기
exports.listScore = function(callback) {
    try {
        config.bridgePool.acquire(function(err, conn) {
            if (err) console.error('err ranking.listScore 1', err);
            // console.log('data', data);
            conn.query('SELECT nick_name,score FROM user_table ORDER BY score DESC;', [], function(err, results) {
                if (err) console.error('err ranking.listScore 2', err);
                callback(err, results);
            });
            config.bridgePool.release(conn); //이걸 안하면 반납이 안됨
        });
    } catch (err) {
        console.error('error :', err);
    }
};