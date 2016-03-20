'use strict';

let mongoose  = require('mongoose'),
	Schema    = mongoose.Schema,
	ObjectId  = Schema.ObjectId;

/**
 * just include reply message
 */

let messageSchema = new Schema({
  authorId: ObjectId,
  topicId: ObjectId,
  hasRead: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now }
});

mongoose.model('Message', messageSchema);
