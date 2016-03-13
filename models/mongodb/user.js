'use strict';

let mongoose = require('mongoose'),
	Schema = mongoose.Schema;

let userSchema = new Schema({
	name: String,
	loginname: String,
	password: String,
	createAt: {type: Date, default: Date.now},
	email: String,
	isBlock: Boolean
});

// define user schema index
userSchema.index({loginname: 1}, {unique: true});
userSchema.index({email: 1}, {unique: true});

mongoose.model('User', userSchema);