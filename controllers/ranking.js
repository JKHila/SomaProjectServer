var ranking = require('../models/ranking.js');
//high 스코어 받아옴
exports.highScore = function(req,res){
	 try {
        var nick_name = req.body.nick_name;
        ranking.getHighScore( nick_name,function(err, results) {
            if (err) {
                console.error(err);
            } else {
                res.json(results);
                //res.render('rankinglist', { title: '랭킹 리스트', data : results });
            }
        });
    } catch (err) {
        console.error(err);
    }
};
//start time 저장
exports.starttime = function(req,res){
	var data = [];
	var nick_name = req.body.nick_name;
	ranking.registerStarttime(nick_name,function(err,results){
		if(err){
			console.log(err);
		}
		else{
			res.send('register start_time');
		}
	});
}
//play time 저장
exports.playtime = function(req,res){
	var data = [];
	var play_time = req.body.play_time;
	var nick_name = req.body.nick_name;

	data.push(play_time);
	data.push(nick_name);
	ranking.registerPlaytime(data,function(err,results){
		if(err){
			console.log(err);
		}
		else{
			res.send('register play_time');
		}
	});
}
//end time 저장
exports.endtime = function(req,res){
	var data = [];
	var nick_name = req.body.nick_name;
	ranking.registerEndtime(nick_name,function(err,results){
		if(err){
			console.log(err);
		}
		else{
			res.send('register end_time');
		}
	});
}

exports.join = function(req,res){
	try {
		var data = [];
		var nick_name = req.body.nick_name;

		ranking.checkUser(nick_name,function(err,results){
			if(err){
				console.log(err);
			}else {
                if (results[0].cnt == 0) { // 신규 유저
                    // 배열에 파라미터를 넣음
                    data.push(nick_name);
                   
                    // 점수 등록
                    ranking.registerScore(data, function(err, result) {
                        if (err) {
                            console.error(err);
                        } else {
                            if (result.affectedRows == 1) {
                                res.send('<script>alert("[신규 유저] 점수 등록을 하였습니다."); location.replace("/rankinglist");</script>');
                            } else {
                                res.send('<script>alert("점수 등록에 실패했습니다."); location.replace("/rankinglist");</script>');
                            }
                        }
                    });
                } else { // 기존 유저
                   res.send('cancel');
                }
            }
        });
    } catch (err) {
        console.error(err);
    }
};

// 랭킹 폼
exports.rankingform = function(req, res) {
    res.render('rankingform.ejs', {
        title: '랭킹 폼'
    });
};

// 랭킹 점수 등록 및 변경
exports.ranking = function(req, res) {
    try {
        var data = [];

        // post 파라미터 받아옴
        var nick_name = req.body.nick_name;
        //var user_id = req.body.user_id;
        var score = req.body.score;
        //var start_time= req.body.start_time;
        //var play_time = req.body.play_time;
        //var end_time = req.body.end_time;


        // 신규 유저인지 확인
        ranking.checkUser(nick_name, function(err, results) {
            if (err) {
                console.error(err);
            } else {
                if (results[0].cnt == 0) { // 신규 유저
                    // 배열에 파라미터를 넣음
                    data.push(nick_name);
                    data.push(score);
                    
                    // 점수 등록
                    ranking.registerScore(data, function(err, result) {
                        if (err) {
                            console.error(err);
                        } else {
                            if (result.affectedRows == 1) {
                                res.send('<script>alert("[신규 유저] 점수 등록을 하였습니다."); location.replace("/rankinglist");</script>');
                            } else {
                                res.send('<script>alert("점수 등록에 실패했습니다."); location.replace("/rankinglist");</script>');
                            }
                        }
                    });
                } else { // 기존 유저
                    data.push(score);
                    data.push(nick_name);
                    //data.push(user_id);

                    ranking.updateScore(data, function(err, result) {
                        if (err) {
                            console.error(err);
                        } else {
                            if (result.affectedRows == 1) {
                                res.send('<script>alert("[기존 유저] 점수 갱신을 하였습니다.!"); location.replace("/rankinglist");</script>');
                                //res.json(data);
                            } else {
                                res.send('<script>alert("[기존 유저] 점수 갱신에 실패했습니다."); location.replace("/rankinglist");</script>');
                            }
                        }
                    });
                }
            }
        });
    } catch (err) {
        console.error(err);
    }
};

// 점수 내역 보기
exports.rankinglist = function(req, res) {
    try {
        // res.json({ data: data });

        // rankinglist.ejs 렌더링 시 data 배열의 값을 이용함

        ranking.listScore(function(err, results) {
            if (err) {
                console.error(err);
            } else {
                res.json(results);
                //res.render('rankinglist', { title: '랭킹 리스트', data : results });
            }
        });
    } catch (err) {
        console.error(err);
    }
};