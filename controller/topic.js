'use strict';

let config 		= require('../config');
let co 			= require('co');
let md5 		= require('md5');
let MarkdownIt 	= require('markdown-it');
let md 			= new MarkdownIt();
let moment 		= require('moment');
let _ 			= require('underscore');
let User 		= require('../models').User;
let Topic 		= require('../models').Topic;
let Reply 		= require('../models').Reply;

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
		};
	let req = this.request.body;
	let title 	= req.title;
	let content = req.content;
	let topic = new Topic();

	topic.title 	= title;
	topic.content 	= content;
	topic.author 	= data.user.loginname;

	yield Promise.resolve()
	.then(() => topic.save())
	.then((topic) => this.redirect(`/topic/detail/${topic._id}`));
};

// 话题详情
exports.detail = function* (){
	let topicId = this.params.id;
	let data = {
			config,
			user: this.session.user
		};
		
	yield Promise.resolve()
	.then(() => Topic.findOne({_id: topicId}))
	.then((topic) => {
		data.topic = {
			_id: 	topic._id,
			title: 	topic.title,
			author: topic.author,
			content:  md.render(topic.content),
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