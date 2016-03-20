'use strict';

let router = require('koa-router')(),
	config = require('./config');

module.exports = router.routes();

// router.get('/user', function* (){
// 	yield this.render('user', {
// 		name: 'ncuzp'
// 	});
// });

router.get('/', function* (){
	yield this.render('index', {
		config: config
	});
});