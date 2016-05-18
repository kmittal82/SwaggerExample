"use strict";

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;



var _contactSchema = new Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	phonenumber: {
		type: String
	}
});

var contact = mongoose.model('Contact', _contactSchema);
module.exports = contact;