var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
	email: {
		type: String, 
		index: { unique: true},
		required: true
	}, 
	password: {
		type: String
	},
	articles : [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}]
});
module.exports = mongoose.model('Account', AccountSchema);