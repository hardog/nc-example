'use strict';

let config = require('../config'),
	co = require('co'),
	md5 = require('md5'),
	User = require('../models').User;

// nodeclub is extract to proxy

// 显示登录界面
exports.showLogin = function* (){
	let data = {
			config,
			user: this.session.user
		};

	if(data.user){
		yield Promise.resolve()
		.then(() => this.redirect('/'));
	}else{
		yield this.render('login', data);
	}
};

// 登录提交
exports.login = function* (){
	let data = {config},
		req = this.request.body,
		loginname = req.loginname,
		password = md5(req.password);

	yield Promise.resolve()
	.then(() => User.findOne({loginname: loginname}))
	.then((user) => {
		if(user && (password === user.password)){
			this.session.loginname = loginname;
			this.redirect('/');
		}else{
			data.errMsg = 'please check name & password';
			return co(this.render('login', data));
		}
	});
};

// 显示注册页面
exports.showRegistry = function* (){
	if(this.session.user){
		this.redirect('/');
	}

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
	user.password = pass;
	user.email = email;
	user.signature = signature;

	// add session
	this.session.loginname = loginname;
	data.user = user;

	yield Promise.resolve()
	.then(() => user.save())
	.then(() => co(this.render('index', data)));
};

// 退出登录
exports.logout = function* (){
	this.session.user = undefined;
	this.session.loginname = undefined;
	this.redirect('/');
};

// 查看用户个人信息
exports.userInfo = function* (){
	let loginname = this.params.loginname,
		data = {config};

	yield Promise.resolve()
	.then(() => User.findOne({loginname: loginname}))
	.then((user) => {
		data.userintro = user;
		if(this.session.user){
			data.user = user;
		}
	})
	.then(() => co(this.render('user', data)))
};
