'use strict';

let path = require('path');
let User = require('../models').User;

// 需要过滤的文件后缀
let filterSuffix = [
	'.ico', '.js', 	 '.css', 
	'.jpg', '.jpeg', '.png', 
	'.gif'
];

module.exports = function* (next){
	// 不处理filterSuffix中包含的文件
	if(filterSuffix.indexOf(path.extname(this.request.url)) !== -1){
		yield next;
	}else{
		let loginname 	= this.session.loginname;
		let url 		= this.request.url;
		let userPromise = Promise.resolve();

		// 静态文件过滤
		if(loginname){
			yield Promise.resolve()
			.then(() => User.findOne({loginname: loginname}))
			.then((user) => {this.session.user = user || undefined;});
		}

		yield* next;
		// just let session record loginname before leave
		this.session.user = undefined;
	}
};