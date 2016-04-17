'use strict';

let config = require('../config'),
	co = require('co'),
	_ = require('underscore'),
	moment = require('moment'),
	User = require('../models').User,
	Topic = require('../models').Topic;

// 显示首页
exports.showIndex = function* (){
	let data = {
			config,
			user: this.session.user
		};

	yield Promise.resolve()
	.then(() => Topic.find())
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


