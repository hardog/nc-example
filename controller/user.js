'use strict';

let config 	= require('../config');
let co 		= require('co');
let md5 	= require('md5');
let User 	= require('../models').User;

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
	let data = {config};
	let req = this.request.body;
	let loginname = req.loginname;
	let password = md5(req.password);

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
	let data = {config};
	let req = this.request.body;
	let uname 		= req.username;
	let loginname 	= req.loginname;
	let email 		= req.email;
	let signature 	= req.signature;
	let pass 	= md5(req.password);

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
	.then(() => this.redirect('/'));
};

// 退出登录
exports.logout = function* (){
	this.session.user = undefined;
	this.session.loginname = undefined;
	this.redirect('/');
};

// 查看用户个人信息
exports.userInfo = function* (){
	let loginname = this.params.loginname;
	let data = {
			config,
			user: this.session.user
		};

	yield Promise.resolve()
	.then(() => User.findOne({loginname: loginname}))
	.then((user) => {data.userintro = user;})
	.then(() => co(this.render('user', data)))
};
