var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema= new Schema({
	_id        :  Schema.Types.ObjectId,
	email      : String,
	Firstname  : String,
	LastName   : String,
	Password   : String,
	Birthday   : Date,
	CompanyName: String,
	Website    : String,
	cellPhone  : String,
	WorkPhone  : String,
	note       : String

},{
	timestamps : true
});

//var ObjectId = require('mongodb').ObjectID;
module.exports = mongoose.model('User', UserSchema);