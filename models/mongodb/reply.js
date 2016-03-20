'use strict';

let mongoose  = require('mongoose'),
	Schema    = mongoose.Schema,
	ObjectId  = Schema.ObjectId;

let replySchema = new Schema({
  content: String,
  topicId: ObjectId,
  authorId: ObjectId,
  createAt: { type: Date, default: Date.now }
});

mongoose.model('Reply', replySchema);
