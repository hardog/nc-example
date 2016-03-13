'use strict';

let User = require('../../models/').User,
	Assert = require('chai').assert;

// avoid loginname,email conflict
let randomNum = parseInt(Math.random() * 100);

describe('test/models/user.js', () => {
	it('should insert an user into mongodb', () => {
		let user = new User();

		user.name = 'test';
		user.loginname = `test${randomNum}`;
		user.email = `test${randomNum}@qq.com`;
		user.password = 'ab671f5709faacf5ba2fdedc9a467bd3';
		user.isBlock = false;

		user.save((err, doc) => {
			Assert(!err, 'err should be null');
			Assert.isEqual(doc.loginname, 'Frand${randomNum}');
		});
	});

	it('should find an user', () => {
		User.find({
			loginname: `test${randomNum}`
		}, (err, user) => {
			Assert(!err, 'err should be null');
			Assert.isObject(doc, 'should be an object');
		})
	});
});