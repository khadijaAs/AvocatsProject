var User = require('../models/user.model.js');
var mongoose   = require('mongoose');
var bcrypt      = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;
const DEFAULT_USER_PICTURE = "/img/user.jpg";

exports.create  = function(req,res){
	//create and save new User
	//***********
	
   /* if(!req.body) {
        return res.status(400).send({message: "User can not be empty"});
    }*/
var user = new User({
        _id        : new mongoose.Types.ObjectId(),
    	email      : req.body.email,//"khadija.asafar@gmail.com",//
		Firstname  : req.body.Firstname,//"khadija",//
		LastName   : req.body.LastName,//"asafar",//
		Password   : req.body.Password,//"password",//
		Birthday   : req.body.Birthday,//"01/01/1111",//
		CompanyName: req.body.CompanyName,//"ensaKech",//
		Website    : req.body.Website,//"www.Khadij@s.com",//
		cellPhone  : req.body.cellPhone,//"66 66 66 66",//
		WorkPhone  : req.body.WorkPhone,//"66 66 66 66",//
		note       : req.body.note//"note"//
    });
    
    user.pre('save', function(next) {
    var user = this;

    // ensure user picture is set
   /* 
    if(!user.picture){
        user.picture = DEFAULT_USER_PICTURE;
    } */

    // only hash the password if it has been modified (or is new)
    //if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
    });


    user.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({messages: "Some error occurred while creating the User."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all users from the database.
    User.find(function(err, users){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving users."});
        } else {
            //res.send(users);
           // console.log(__dirname);
            
            //console.log(users);
            res.render('../app/views/users/index', {
                users : users
            });
        }
    });

};

exports.findOne = function(req, res) {
    
    User.findOne(mongoose.Schema.Types.ObjectId(req.params._id), function(err,user){//req.params._id, function(err, user) {
     // console.log(user);
        if(err) {
            if(err.kind === 'ObjectId') {
             
                return res.send(err);                
            }
            return res.status(500).send({message: "Error retrieving user with id " + req.params._id + "  "+err});
        } 

        if(!user) {
            console.log("user  : "+user);
            return res.status(404).send({message: "User not found with email" + req.params._id});            
        }
        console.log("*************************************:"+user);
      res.send(user);
    });

};

/*exports.update = function(req, res) {
    // Update a user identified by the _id in the request
    //console.log("---------------------params._id--------------:"+req.params._id);

    User.findById(req.params._id, function(err,user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id 1" + req.params._id});                
            }
            return res.status(500).send({message: "Error finding user with id " + req.params._id});
        }

        if(!user) {
            return res.status(404).send({message: "User not found with id 2" + req.params._id});            
        }

        email      = req.body.email;
		Firstname  = req.body.Firstname;
		LastName   = req.body.LastName;
		Password   = req.body.Password;
		Birthday   = req.body.Birthday;
		CompanyName= req.body.CompanyName;
		Website    = req.body.Website;
		cellPhone  = req.body.cellPhone;
		WorkPhone  = req.body.WorkPhone;
		note       = req.body.note;

        user.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update user with id " + req.params._id});
            } else {
                res.send(data);
            }
        });
    });

};*/

exports.delete = function(req, res) {
    // Delete a user with the specified _id in the request
    //console.log("---------------------params._id--------------:"+req.params._id);
    User.findOneAndRemove(mongoose.Schema.Types.ObjectId(req.params._id), function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id 3" + req.params._id });                
            }
            return res.status(500).send({message: "Could not delete user with id " + req.params._id + err});
        }

        if(!user) {
            return res.status(404).send({message: "User not found with id 4" + req.params._id + err});
        }

        res.send({message: "User deleted successfully!"})
    });
};