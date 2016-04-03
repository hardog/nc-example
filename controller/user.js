'use strict';

let config = require('../config'),
	co = require('co'),
	User = require('../models').User;

// nodeclub is extract to proxy

// 现实登录界面
exports.showLogin = function* (){
	yield this.render('login', {config, isSuccess: false});
};

// 登录提交
exports.login = function* (){
	let isSuccess = false,
		req = this.request.body,
		loginname = req.loginname,
		// TODO md5
		password = req.password;

	yield Promise.resolve()
	.then(() => User.findOne({loginname: loginname}))
	.then((user) => co(this.render('login', {
		config,
		isSuccess: user,
		msg: 'login failed, please check loginname and password'
	})))
	.then(() => {
		// TODO redirect to index page
	});
};

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
	// TODO md5 加密
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
