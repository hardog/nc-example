'use strict';

let router = require('koa-router')();

module.exports = router.routes();

router.get('/user', function* (){
	this.body = 'this is user get';
});

router.get('/', function* (){
	this.body = 'this is index.html';
});