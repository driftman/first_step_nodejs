var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
	title : {
		type: String,
	},
	content : {
		type: String,
	},
	account: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account'
	},
	created_at : {
		type: Date,
		default: Date.now
	},
	updated_at : {
		type: Date,
		default: Date.now
	}
});
module.exports = mongoose.model('Article', ArticleSchema);
