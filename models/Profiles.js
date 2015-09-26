var mongoose = require('mongoose');
var objectId = mongoose.Schema.ObjectId;


var ProfileSchema = new mongoose.Schema(
	{
		name: String, 
		age: Number, 
		account: { type: objectId, ref: 'Account'},
		created_at: {type: Date, default: Date.now} ,
		updated_at:{
			type: Date,
			default: Date.now
		}
	});
module.exports = mongoose.model('Profile', ProfileSchema);