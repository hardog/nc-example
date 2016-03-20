'use strict';

/**
 *  config file
 */
let config = {
    // site basic information
    title: 'nc-example',
    description: 'just a koa nodeclub example',
    keywords: 'koa, es6, nodeclub',

    // use dialect
    useDialect: 'mongodb',

    // mongodb 配置
    mongodb: {
      db: 'mongodb://127.0.0.1/nc-example',
      poolSize: 5
    },

    // mysql 配置, 当前未使用
    mysql: {
      auth: {
        user: 'username',
        pass: 'password'
      },
      conn: {
        host: '127.0.0.1',
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        }
      }
    }
};

module.exports = config;