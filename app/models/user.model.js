var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const DEFAULT_USER_PICTURE = "/img/user.jpg";
const SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;
var UserSchema= new Schema({
	_id        :  Schema.Types.ObjectId,
	email      :  { type: String, required: true},
	Firstname  :  { type: String, required: true},
	LastName   :  { type: String, required: true},
	Password   :  { type: String, default: null},
	Birthday   :  { type: Date, default: null},
	CompanyName:  { type: String, default: null},
	Website    :  { type: String, default: null},
	cellPhone  :  { type: String, default: null},
	WorkPhone  :  { type: String, default: null},
	HomePhone  :  { type: String, default: null},
	note       :  { type: String, default: null},
	ProfilePicture: { type: String, default:  DEFAULT_USER_PICTURE}, 
	adress1    :  Schema.Types.ObjectId,
	adress2    :  Schema.Types.ObjectId,
	role	   :  { type: String, default: "costomer"} 

},{
	timestamps : true
});

UserSchema.pre('save', function(next) {
    var user = this;

    // ensure user picture is set
    if(!user.picture){
        user.picture = DEFAULT_USER_PICTURE;
    }

    // only hash the Password if it has been modified (or is new)
    if (!user.isModified('Password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the Password using our new salt
        bcrypt.hash(user.Password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext Password with the hashed one
            user.Password = hash;
            next();
        });
    });
});

/**
 * Create an Instance method to validate user's Password
 * This method will be used to compare the given Password with the passwoed stored in the database
 * 
 */
UserSchema.methods.validatePassword = function(Password, callback) {
    bcrypt.compare(Password, this.Password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

//var ObjectId = require('mongodb').ObjectID;
var User = mongoose.model('user', UserSchema);
module.exports = User;