var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var DocumentSchema= new Schema({
	_id           : Schema.Types.ObjectId,
	FoldeId	      : Schema.Types.ObjectId,
	CaseId        : Schema.Types.ObjectId,
	DocumentName  : String,
	AssignedDate  : Date,
	Description   : String,
   // "Content"       : "String",
    Tags          : [],

},{
	timestamps : true
});

//var ObjectId = require('mongodb').ObjectID;
module.exports = mongoose.model('Document', DocumentSchema);