exports.testget = function(req,res){
	try{
		console.log(req.query);
		res.json({result:req.query});
	}catch(err){
		console.error(err);
	}
}

exports.testpost = function(req,res){
	try{
		console.log(req.body);
		res.json({result:req.body});
	}catch(err){
		console.error(err);
	}
}