'use strict';
let config = require('../config');

module.exports = function* (next){
	let code, errMsg,
		errCodes = {
			404: `404, Not Found Information you desired!`,
			11000: `11000, should not create the same record!`,
			default: `Errors Happen!`
		};

	try{
		yield* next;
	}catch(err){
		console.log('err,', err);
		errMsg = `${err.message} ${err.stack}`;
		if(err.name === 'MongoError'){
			code = err.code;
		}
	}

	if(!code && errCodes[this.response.status]){
		code = this.response.status;
	}

	if(!code){
		yield next;
	}else{
		yield this.render('error', {
			config,
			errors: `${errCodes[code]} ${errMsg || ''}`
		});
	}
};