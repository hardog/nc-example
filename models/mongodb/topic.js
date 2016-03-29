'use strict';

let mongoose  = require('mongoose'),
	Schema    = mongoose.Schema,
	ObjectId  = Schema.ObjectId;

let topicSchema = new Schema({
  title: String,
  content: String,
  authorId: ObjectId,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

mongoose.model('Topic', topicSchema);
