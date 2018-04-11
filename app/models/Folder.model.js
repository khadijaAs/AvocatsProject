var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var FolderSchema= new Schema({
	_id        :  Schema.Types.ObjectId,
	FolderName :  String

},{
	timestamps : true
});

//var ObjectId = require('mongodb').ObjectID;
module.exports = mongoose.model('Folder', FolderSchema);