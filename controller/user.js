'use strict';

let config = require('../config'),
	co = require('co'),
	md5 = require('md5'),
	User = require('../models').User;

// nodeclub is extract to proxy

// 显示登录界面
exports.showLogin = function* (){
	let u = this.session.user || {},
		data = {config};

	yield Promise.resolve()
	.then(() => User.findOne({loginname: u.loginname}))
	.then((user) => {
		if(user){
			data.user = user;
			return co(this.render('index', data));
		}else{
			return co(this.render('login', data));
		}
	});
};

// 登录提交
exports.login = function* (){
	let data = {config},
		isOk = false, tpl = 'index',
		req = this.request.body,
		loginname = req.loginname,
		password = md5(req.password);

	yield Promise.resolve()
	.then(() => User.findOne({loginname: loginname}))
	.then((user) => {
		if(user && (password === user.password)){
			this.session.user = {loginname};
			data.user = user;
			isOk = true;
		}else{
			tpl = 'login';
			data.errMsg = 'please check name & password';
		}

		return Promise.resolve();
	})
	.then(() => co(this.render(tpl, data)));
};

// 显示注册页面
exports.showRegistry = function* (){
	yield this.render('registry', {config});
};

// 用户注册
exports.registry = function* (){
	let data = {config},
		req = this.request.body,
		uname = req.username,
		loginname = req.loginname,
		email = req.email,
		pass = md5(req.password),
		signature = req.signature;

	let user = new User();
	user.name = uname;
	user.loginname = loginname;
	// TODO md5 加密
	user.password = pass;
	user.email = email;
	user.signature = signature;

	// add session
	this.session.user = {loginname};
	data.user = user;

	yield Promise.resolve()
	.then(() => user.save())
	.then(() => co(this.render('index', data)));
};

// 退出登录
exports.logout = function* (){
	this.session.user = undefined;
	yield co(this.render('index', {config}));
};

// 查看用户个人信息
exports.userInfo = function* (){
	let u = this.session.user || {},
		loginname = u.loginname,
		data = {config};

	yield Promise.resolve()
	.then(() => User.findOne({loginname: loginname}))
	.then((user) => {
		if(user){
			data.user = user;
		}

		return Promise.resolve();
	})
	.then(() => co(this.render('user', data)))
};
