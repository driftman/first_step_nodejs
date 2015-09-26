var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = mongoose.Schema.Types.ObjectId;
var ArticleSchema = new Schema({
	title : {
		type: String,
	},
	content : {
		type: String,
	},
	account: {
		type: objectId,
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
