'use strict';

let mongoose  = require('mongoose'),
	ObjectId  = Schema.ObjectId,
	Schema    = mongoose.Schema;

let topicSchema = new Schema({
  title: String,
  content: String,
  authorId: ObjectId,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

mongoose.model('Topic', topicSchema);
