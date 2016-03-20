'use strict';

let mongoose = require('mongoose'),
	config   = require('../../config'),
	logger = require('../../common/logger');

/**
 * mongodb connect by mongoose
 * @return if error throw
 */
mongoose.connect(config.mongodb.db, {
  server: {
  	poolSize: config.mongodb.poolSize
  }
}, (err) => {
  if (err) {
    logger.error('connect to %s error: ', config.mongodb.db, err.message);
    process.exit(1);
  }
});

// models
require('./mongodb/user');
require('./mongodb/topic');
require('./mongodb/reply');
require('./mongodb/message');

exports.User         = mongoose.model('User');
exports.Topic        = mongoose.model('Topic');
exports.Reply        = mongoose.model('Reply');
exports.Message      = mongoose.model('Message');
