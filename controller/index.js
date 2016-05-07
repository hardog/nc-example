'use strict';

let config 	= require('../config');
let co 		= require('co');
let _ 		= require('underscore');
let moment 	= require('moment');
let User 	= require('../models').User;
let Topic 	= require('../models').Topic;

// 显示首页
exports.showIndex = function* (){
	let data = {
			config,
			user: this.session.user
		};

	yield Promise.resolve()
	.then(() => Topic.find().sort({'createAt':-1}))
	.then((topics) => {
		let tps = [];
		
		_.each(topics, (v) => {
			tps.push({
				title: v.title,
				content: v.content,
				author: v.author,
				_id: v._id,
				createAt: moment(v.createAt).fromNow()
			});
		});

		data.topics = tps;
		return Promise.resolve();
	})
	.then(() => co(this.render('index', data)));
};


