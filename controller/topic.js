'use strict';

let config = require('../config'),
	co = require('co'),
	md5 = require('md5'),
	MarkdownIt = require('markdown-it'),
    md = new MarkdownIt(),
    moment = require('moment'),
    _ = require('underscore'),
	User = require('../models').User,
	Topic = require('../models').Topic,
	Reply = require('../models').Reply;

// 显示创建主题页
exports.show = function* (){
	let data = {
			config,
			user: this.session.user,
		};

	yield this.render('create_topic', data);
};

// 创建主题
exports.create = function* (){
	let data = {
			config,
			user: this.session.user
		},
		req = this.request.body,
		title = req.title,
		content = req.content;

	let topic = new Topic();
	topic.title = title;
	topic.content = content;
	topic.author = data.user.loginname;

	yield Promise.resolve()
	.then(() => topic.save())
	.then((topic) => this.redirect(`/topic/detail/${topic._id}`));
};

// 话题详情
exports.detail = function* (){
	let topicId = this.params.id,
		data = {
			config,
			user: this.session.user
		};
		
	yield Promise.resolve()
	.then(() => Topic.findOne({_id: topicId}))
	.then((topic) => {
		data.topic = {
			_id: topic._id,
			title: topic.title,
			author: topic.author,
			content: md.render(topic.content),
			createAt: moment(topic.createAt).fromNow(),
		};
		return Promise.resolve();
	})
	.then(() => Reply.find({topicId: topicId}).sort({'createAt':-1}))
	.then((replys) => {
		data.topic.replys = [];
		_.each(replys, (v) => {
			data.topic.replys.push({
				replyer: v.replyer,
				content: v.content,
				createAt: moment(v.createAt).fromNow()
			});
		});
	})
	.then(() => co(this.render('topic', data)));
};