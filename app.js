'use strict';

let koa = require('koa'),
	path = require('path'),
	send = require('koa-send'),
	less = require('koa-less'),
	mount = require('koa-mount'),
	koabody = require('koa-body'),
	router = require('koa-router')(),
	log = require('koa-request-log'),
	render = require('koa-ejs'),
	app = koa();
// https://github.com/dlau/koa-body
let publicPath = path.join(__dirname, 'public');

let routes = require('./routers');
// TODO 加上缓存

// add view render
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true
});

// 绑定路由地址
app
.use(log())
.use(less('public', {
	dest: publicPath
}))
.use(function* (next){
	try{
		yield* next;
	}catch(err){
		console.log('err happen', err);
		this.body = err;
	}
})
.use(koabody())
.use(mount(routes))
.use(mount(router.allowedMethods()))
.use(function* (){
	yield send(this, this.path, {
		root: publicPath
	});
});

// app.on('error', function(err){
// 	this.status = '200';
// 	this.body = err;
// 	// this.render('registry', {config: err});
// });

// listen on port 3000
app.listen(3000);

require('colors');
console.log('nc-example running at http://localhost:3000'.green);
console.log('Node Version: v4.3.0, MongoDB: v3.0.7'.green);
console.log('God bless you ~'.green);
