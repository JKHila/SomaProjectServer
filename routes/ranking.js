var express = require('express');
var rankingController = require('../controllers/ranking');
var ranking = express.Router();

ranking.get('/rankingform',rankingController.rankingform);
ranking.post('/ranking',rankingController.ranking);
ranking.get('/rankinglist',rankingController.rankinglist);
ranking.post('/highscore',rankingController.highScore);

ranking.post('/playtime',rankingController.playtime);
ranking.post('/starttime',rankingController.starttime);
ranking.post('/endtime',rankingController.endtime);
ranking.post('/join',rankingController.join);

module.exports = ranking;