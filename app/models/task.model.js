var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var TaskSchema= new Schema({
	_id         :  Schema.Types.ObjectId,
	DueDate		: Date,
	priority	: {1,2,3},
	Description	: String

},{
	timestamps : true
});

//var ObjectId = require('mongodb').ObjectID;
module.exports = mongoose.model('Task', TaskSchema);