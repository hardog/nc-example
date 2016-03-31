'use strict';

let config = require('../config'),
	co = require('co'),
	User = require('../models').User;

// 显示注册页面
exports.showRegistry = function* (){
	yield this.render('registry', {
		config: config, 
		isSuccess: false
	});
};

// 用户注册
exports.registry = function* (){
	let isSuccess = false,
		req = this.request.body,
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

	yield Promise.resolve()
	.then(() => user.save())
	.then(() => co(this.render('registry', {
		config: config,
		isSuccess: true
	})));
};
