'use strict';

let koa 		= require('koa');
let path 		= require('path');
let send 		= require('koa-send');
let less 		= require('koa-less');
let mount 		= require('koa-mount');
let koabody 	= require('koa-body');
let session 	= require('koa-session');
let router 		= require('koa-router')();
let log 		= require('koa-request-log');
let render 		= require('koa-ejs');
let compress	= require('koa-compress');
let etag 		= require('koa-etag');
let errors 		= require('./middleware/error');
let userSess	= require('./middleware/user_sess');
let conditional = require('koa-conditional-get');
let routes 		= require('./routers');

let app = koa();
let publicPath = path.join(__dirname, 'public');

// add view render
render(app, {
  root: path.join(__dirname, 'views'),
  cache: false,
  debug: true
});

// for cookie
app.keys = ['keys'];

// 绑定路由地址
app
.use(log())
.use(less('public', {
	dest: publicPath
}))
.use(errors)
.use(session(app))
.use(userSess)
.use(koabody())
.use(conditional())
.use(etag())
.use(compress({threshold: 2048}))
.use(mount(routes))
.use(mount(router.allowedMethods()))
.use(function* (){
	yield send(this, this.path, {
		root: publicPath
	});
});

// listen on port 3000
if(!module.parent){
	app.listen(3000);
	require('colors');
	console.log('nc-example running at http://localhost:3000'.green);
	console.log('Node Version: v4.3.0, MongoDB: v3.0.7'.green);
	console.log('God bless you ~'.green);
}

module.exports = app;
