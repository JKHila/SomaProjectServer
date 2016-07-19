var generic_pool = require('generic-pool'),
    mysql        = require('mysql');

var config = {};

var root = process.cwd();  //Returns the current working directory of the process.  http://nodejs.org/api/process.
console.log(root);
if( root === "C:\\ProgramData\\MySQL\\MySQL Server 5.7" ){
    // omybrand DB 풀(로컬)
    config.bridgePool = generic_pool.Pool({
        name: 'mysql',
        create: function(callback) {
            var config = {
                host: 'localhost',
                port: '3306',
                user: 'root',
                password: 'wh168168',
                database: 'testDB'
            };
            var client = mysql.createConnection(config);
            client.connect(function(err) {
                if(err) console.error('err', err);
                callback(err, client);
            });
        },
        destroy: function(client) {
            client.end();
        },
        max: 10,
        min: 2,
        idleTimeoutMillis : 30000, // 5분 동안 접속을 유지한다
        log : false
    });
} else {
    // omybrand DB 풀(가비아)
    config.bridgePool = generic_pool.Pool({
        name: 'mysql',
        create: function(callback) {
            var config = {
                host: 'localhost',
                port: '3306',
                user: 'root',
                password: 'wh168168',
                database: 'testDB'
            };
            var client = mysql.createConnection(config);
            client.connect(function(err) {
                if(err) console.error('err', err);
                callback(err, client);
            });
        },
        destroy: function(client) {
            client.end();
        },
        max: 1000,
        min: 100,
        idleTimeoutMillis : 30000, // 5분 동안 접속을 유지한다
        log : false
    });
}

process.on('exit', function (){ // process 가 종료될 때
    pool.drain(function() {
        pool.destroyAllNow();
    });
});

module.exports = config;