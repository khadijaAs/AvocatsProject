var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CaseSchema= new Schema({
	_id           : Schema.Types.ObjectId,
	CaseName	  : String,
	PracticeArea  : Schema.Types.ObjectId,
	DateOuverture : Date,
	description   : String,
	StatuteOfLimitation: String,
	/* .........
	..........
	...... */

},{
	timestamps : true
});

//var ObjectId = require('mongodb').ObjectID;
module.exports = mongoose.model('Case', CaseSchema);