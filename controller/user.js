'use strict';

let config = require('../config'),
	User = require('../models').User;

// 显示注册页面
exports.showRegistry = function* (){
	yield this.render('registry', {config: config});
};

// 用户注册
exports.registry = function* (){
	let req = this.request.body,
		uname = req.username,
		loginname = req.loginname,
		email = req.email,
		pass = req.password,
		signature = req.signature;

	let user = new User();

	user.name = uname;
	user.loginname = loginname;
	user.password = pass;
	user.email = email;
	user.signature = signature;

	yield user
	.save();
};
