'use strict';

let mongoose  = require('mongoose'),
	Schema    = mongoose.Schema;

let topicSchema = new Schema({
  title: String,
  content: String,
  author: String,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

mongoose.model('Topic', topicSchema);
