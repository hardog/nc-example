'use strict';

let mongoose = require('mongoose'),
	config   = require('../../config');

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
    console.error('connect to %s error: ', config.mongodb.db, err.message);
    process.exit(1);
  }
});

// models
require('./user');
require('./topic');
require('./reply');

exports.User         = mongoose.model('User');
exports.Topic        = mongoose.model('Topic');
exports.Reply        = mongoose.model('Reply');
