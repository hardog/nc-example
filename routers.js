'use strict';

// controllers
let router = require('koa-router')(),
	config = require('./config'),
	index = require('./controller/'),
	user = require('./controller/user'),
	topic = require('./controller/topic'),
	reply = require('./controller/reply');

module.exports = router.routes();

router
.get('/', index.showIndex)
// 用户相关
.get('/login', user.showLogin)
.post('/login', user.login)
.get('/registry', user.showRegistry)
.post('/registry', user.registry)
.get('/logout', user.logout)
.get('/user/:loginname', user.userInfo)
// 主题相关
.get('/topic/show', topic.show)
.post('/topic/create', topic.create)
.get('/topic/detail/:id', topic.detail);