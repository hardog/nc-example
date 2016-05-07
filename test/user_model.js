'use strict';

let User 	= require('../models/').User;
let expect 	= require('chai').expect;

// avoid loginname,email conflict
let randomNum = parseInt(Math.random() * 1000);

describe('test/models/user.js', () => {
	it('should insert an user into mongodb', (done) => {
		let user = new User();

		user.name 		= 'test';
		user.loginname 	= `test${randomNum}`;
		user.email 		= `test${randomNum}@qq.com`;
		user.password 	= 'ab671f5709faacf5ba2fdedc9a467bd3';
		user.isBlock 	= false;

		user.save((err, doc) => {
			expect(err).to.be.null;
			expect(doc.loginname).to.equal(`test${randomNum}`);
			done();
		});
	});

	it('should find an user', (done) => {
		User.find({
			loginname: `test${randomNum}`
		}, (err, user) => {
			expect(err).to.be.null;
			expect(user).to.be.an.array;
			done();
		})
	});
});