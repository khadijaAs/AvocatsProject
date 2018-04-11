var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var AdressSchema= new Schema({
	_id         :  Schema.Types.ObjectId,
	street	    :  string,
	state	    :  string,
	city	    :  string,
	contry	    :  string,
	PostalCode 	:  string

},{
	timestamps : true
});

//var ObjectId = require('mongodb').ObjectID;
module.exports = mongoose.model('Adress', AdressSchema);