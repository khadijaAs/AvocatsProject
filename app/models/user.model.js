var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({

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

module.exports = mongoose.model('User', UserSchema);