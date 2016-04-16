'use strict';

let config = require('../config'),
	co = require('co'),
	User = require('../models').User;

// 显示首页
exports.showIndex = function* (){
	let u = this.session.user || {},
		data = {config};

	yield Promise.resolve()
	.then(() => User.findOne({loginname: u.loginname}))
	.then((user) => {
		if(user){
			data.user = user;
		}

		return Promise.resolve();
	})
	.then(() => co(this.render('index', data)));
};


