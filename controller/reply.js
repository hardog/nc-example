'use strict';

let Reply = require('../models').Reply;

// 显示首页
exports.create = function* (){
	let req = this.request.body;
	let reply = new Reply();
	
	reply.topicId = req.topicId;
	reply.content = req.content;
	reply.replyer = this.session.user.loginname;

	yield Promise.resolve()
	.then(() => reply.save())
	.then(() => this.redirect(`/topic/detail/${reply.topicId}`));
};


