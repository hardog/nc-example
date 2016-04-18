'use strict';

/**
 *  config file
 */
let config = {
    // site basic information
    title: 'nc-example',
    siteUrl: 'http://localhost:3000/',
    description: 'just a koa nodeclub example',
    keywords: 'koa, es6, nodeclub',

    // use dialect
    useDialect: 'mongodb',

    // mongodb 配置
    mongodb: {
      db: 'mongodb://127.0.0.1/nc-example',
      poolSize: 5
    }
};

module.exports = config;