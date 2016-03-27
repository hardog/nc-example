'use strict';

let config = require('../config');

// 显示首页
exports.showIndex = function* (){
	yield this.render('index', {config: config});
};

