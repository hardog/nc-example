## NC-EXAMPLE

[![Build Status](https://travis-ci.org/hardog/nc-example.svg?branch=master)](https://travis-ci.org/hardog/nc-example)
**an simple nodeclub example project realize by koa**

## SHOWING

- 首页

![首页](http://hardog.net/images/assist/20160417/index.png)

- 主题详情

![主题详情](http://hardog.net/images/assist/20160417/topicDetail.png)

- 主题发表

![主题发表](http://hardog.net/images/assist/20160417/publishTopic.png)

- 主题回复

![主题回复](http://hardog.net/images/assist/20160417/reply.png)

- 用户登录

![用户登录](http://hardog.net/images/assist/20160417/login.png)

- 用户注册

![用户注册](http://hardog.net/images/assist/20160417/registry.png)

## STARTUP

1. clone本项目
2. 准备项目环境

	- `node v4.3.0`
	- `mongodb v3.0.7`

3. 修改项目根目录下配置文件`config.js`
4. 安装项目依赖

	- `$npm install`

5. 启动项目

	- `$node app`

## FEATURES

项目特性列表如下:

- requirejs客户端
- mongoose数据存储
- koa-ejs页面渲染
- koa-router处理路由
- koa-session控制用户登录
- koa-send控制静态文件访问
- koa-compress启用gzip压缩
- koa-request-log记录请求日志
- koa-less使用less编译样式文件
- koa-etag/koa-conditional-get添加缓存功能

## TEST

进入项目根目录输入以下命令即可:
`$ mocha`
