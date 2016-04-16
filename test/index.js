'use strict';

let request = require('supertest'),
	localAddress = 'http://192.168.6.6:8060',
	pre3Address = 'http://172.16.3.223:8060',
	pre1Address = 'http://192.168.40.35:8060',
	onlineAddress = 'http://open.hmp2.fi.beibei.com',
	_ = require('underscore'),
	md5 = require('md5'),
	Assert = require('chai').assert;

let remote = request(pre1Address);
describe('/server/open/system/purview.js', function(){
	describe('#verification', function(){
		it.only('/hms/module/dashboard', function(done){
			remote
			.get('/system/purview/verification')
			.query({
				type: 'url',
				key: '/hms/module/dashboard',
				uid: 402,
				app_id: 1,
				sign: md5('key=/hms/module/dashboard;type=url;uid=402;ycz73g8xcKUnduVK9kpA9a')
			})
			.end((err, res) => {
				Assert.isNull(err, 'should be null');
				Assert.isOk(res.body.status, 'should be true');
				Assert.isOk(res.body.result, 'should be true');
				Assert.equal('N.T.T', res.body.detail, 'should be N.T.T');
				done();
			});
		});
	});

	describe('#batchVerification', function(){
		it('should return a batchVerification result', function(done){
			remote
			.get('/system/purview/batchVerification')
			.query({
				type: 'item',
				key: 'dc.sqlList.[9,200,251]',
				uid: 171,
				app_id: 1,
				sign: md5('key=dc.sqlList.[9,200,251];type=item;uid=171;ycz73g8xcKUnduVK9kpA9a')
			})
			.end((err, res) => {
				Assert.isNull(err, 'should be null');
				Assert.isOk(res.body.status, 'should be true');
				Assert.equal('["T.N.N","T.N.N","T.N.N"]', res.body.detail, 'should be ["T.N.N","T.N.N","T.N.N"]');
				done();
			});
		});
	});

	describe('#authorizeList', function(){
		it('should get user accessable list', function(done){
			remote
			.get('/system/purview/authorizeList')
			.query({
				list: 'dc.sqlList',
				uid: 180, 
				page: 1, 
				size: 5, 
				app_id: 1, 
				sign: md5('list=dc.sqlList;page=1;size=5;uid=180;ycz73g8xcKUnduVK9kpA9a')
			})
			.end((err, res) => {
				Assert.isNull(err, 'should be null');
				Assert.isOk(res.body.status, 'should be true');
				Assert.equal('55;93;94;123;150', res.body.items.join(';'), 'should be equal 55;93;94;123;150');
				done();
			});
		});
	});

	describe('#userDetail', function(){
		it('should return user purview detail', function(done){
			remote
			.get('/system/purview/userDetail')
			.query({
				app_id: 1,
				uid: 111,
				sign: md5('uid=111;ycz73g8xcKUnduVK9kpA9a')
			})
			.end((err, res) => {
				Assert.isNull(err, 'should be null');
				Assert.equal('1;4',res.body.data.app.join(';'), 'should equal 1;4');
				Assert.isArray(res.body.data.role, 'should be array');
				done();
			});
		});
	});

	describe('#create', function(){
		it('should create a purview', function(done){
			remote
			.get('/system/purview/create')
			.query({
				key: 'dc.sqlList.1010',
				tactics: false, 
				app_id: 1,
				type: 'item', 
				sign: md5('key=dc.sqlList.1010;tactics=false;type=item;ycz73g8xcKUnduVK9kpA9a') 
			})
			.end((err, res) => {
				Assert.isOk(res.body.status, 'should be ok');
				// Assert.equal('exist the same key', res.body.msg,'should be equal [exist the same key]');
				Assert.isNull(err, 'should be null');
				done();
			});
		});
	});

	describe('#modify', function(){
		it('should create a purview', function(done){
			remote
			.get('/system/purview/modify')
			.query({
				key: 'dc.sqlList.1010',
				tactics: true, 
				app_id: 1,
				sign: md5('key=dc.sqlList.1010;tactics=true;ycz73g8xcKUnduVK9kpA9a') 
			})
			.end((err, res) => {
				console.log('err>',err);
				console.log('res>', res.body);
				Assert.isNull(err, 'should be null');
				Assert.isOk(res.body.status, 'should be ok');
				done();
			});
		});
	});

	describe('#delete', function(){
		it('should delete a purview', function(done){
			remote
			.get('/system/purview/delete')
			.query({
				key: 'dc.sqlList.1010',
				app_id: 1,
				sign: md5('key=dc.sqlList.1010;ycz73g8xcKUnduVK9kpA9a') 
			})
			.end((err, res) => {
				Assert.isNull(err, 'should be null');
				Assert.isOk(res.body.status, 'should be ok');
				done();
			});
		});
	});

	describe('#queryRoles', function(){
		it('should return roles list', function(done){
			remote
			.get('/system/purview/queryRoles')
			.query({
				app_id: 1,
				_page: 1, 
				role: '运营',
				_size: 20, 
				sign: md5(`app_id=1;_page=1;role=运营;_size=20;ycz73g8xcKUnduVK9kpA9a`)
			})
			.end((err, res) => {
				Assert.isNull(err, 'should be null');
				Assert.isOk(res.body.status, 'should be ok');
				Assert.equal('17;18;31', res.body.role[0].gp, 'should be equal 17;18;31');
				done();
			});
		});
	});

	describe('#applyRole', function(){
		it('should receive a mail', function(done){
			this.timeout(3000);

			remote
			.get('/system/purview/applyRole')
			.query({
				app_id: 1, 
				uid: 1404, 
				uname: '冯春艳', 
				roleid: 7, 
				rolename: '公司管理层', 
				applystatus: 'wconfirm', 
				sign: md5(`uid=1404;uname=冯春艳;roleid=7;rolename=公司管理层;applystatus=wconfirm;ycz73g8xcKUnduVK9kpA9a`)
			})
			.end((err, res) => {
				Assert.isNull(err, 'should be null');
				Assert.isOk(res.body.status, 'should be ok');
				done();
			});
		});
	});

	describe('#confirmApply', function(){
		it('should change purviewroleapply status', function(done){

			remote
			.get('/system/purview/confirmApply')
			.query({
				app_id: 1, 
				id: 31, 
				uid: 1404,
				roleid: 7, 
				checker: '赵朋', 
				applystatus: 'agree', 
				sign: md5(`app_id=1;checker=赵朋;id=31;roleid=7;uid=1404;ycz73g8xcKUnduVK9kpA9a`)
			})
			.end((err, res) => {
				Assert.isNull(err, 'should be null');
				Assert.equal('not found purviewRoleApply record', res.body.msg);
				done();
			});
		});
	});

	describe('#cancelRole', function(){
		it('should cancel specified user role', function(done){

			remote
			.get('/system/purview/cancelRole')
			.query({
				app_id: 1, 
				uid: 870,
				roleid: 6, 
				sign: md5(`app_id=1;roleid=6;uid=870;ycz73g8xcKUnduVK9kpA9a`)
			})
			.end((err, res) => {
				Assert.isNull(err, 'should be null');
				Assert.isOk(res.body.status, 'should be ok');
				done();
			});
		});
	});

	describe('#queryApplyRecords', function(){
		it('should return 1 page apply reocrds', function(done){

			remote
			.get('/system/purview/queryApplyRecords')
			.query({
				_size: 10,
				_page: 1
			})
			.end((err, res) => {
				Assert.isNull(err, 'should be null');
				Assert.isOk(res.body.status, 'should be ok');
				Assert.equal(10, res.body.size, 'should be 10');
				Assert.isArray(res.body.list, 'should be an array');
				done();
			});
		});
	});
});