'use strict';

// controllers
let router = require('koa-router')(),
	config = require('./config'),
	index = require('./controller/'),
	user = require('./controller/user'),
	topic = require('./controller/topic'),
	reply = require('./controller/reply'),
	msg = require('./controller/message');

module.exports = router.routes();

router
.get('/', index.showIndex)
.get('/login', user.showLogin)
.post('/login', user.login)
.get('/registry', user.showRegistry)
.post('/registry', user.registry);