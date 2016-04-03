'use strict';

let config = require('../config'),
	co = require('co'),
	User = require('../models').User;

// 显示首页
exports.showIndex = function* (){
	yield Promise.resolve()
	.then(() => User.findOne({loginname: 'Frand'}))
	.then((user) => co(this.render('index', {
		config: config,
		user: {
			name: user.name,
			loginname: user.loginname,
			isLogin: true
		}
	})));
};

