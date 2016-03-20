'use strict';

let koa = require('koa'),
	mount = require('koa-mount'),
	router = require('koa-router')(),
	log = require('koa-request-log'),
	app = koa();

require('colors');
let routes = require('./routers');

// 绑定路由地址
app
.use(log())
.use(mount(routes))
.use(mount(router.allowedMethods()));

app.listen(3000);
console.log('nc-example running at http://localhost:3000'.green);
console.log('Node Version: v4.3.0, MongoDB: v3.0.7'.green);
console.log('God bless you ~'.green);
