'use strict';

let expect 	= require('chai').expect;
let config  = require('../config');
let app		= require('../app');
let request	= require('supertest');
let remote;

// test from api which need running app
describe('#routes[/login]', () => {
	before((done) => {
		remote = request(app.listen(() => {
			done();
		}));
	});

	it('should get login html code', (done) => {
		remote
		.get('/login')
		.expect(200)
		.expect('content-type', 'text/html; charset=utf-8')
		.end((err, r) => {
			expect(err).to.be.null;
			expect(r.text).to.a.string;
			done();
		});
	});

	it('should login successful', (done) => {
		remote
		.post('/login')
		.send({
			loginname: 'test',
			password: 'test'
		})
		.expect(200)
		.end((err, r) => {
			expect(err).to.be.null;
			expect(/please check name &amp; password/.test(r.text)).to.be.true;
			done();
		});
	});
});