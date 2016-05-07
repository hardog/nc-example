'use strict';

// controllers
let router = require('koa-router')();
let config = require('./config');
let index  = require('./controller/');
let user   = require('./controller/user');
let topic  = require('./controller/topic');
let reply  = require('./controller/reply');

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
.get('/topic/detail/:id', topic.detail)
// 主题回复相关
.post('/reply/create', reply.create);