var User = require('../models/user.model.js');

exports.create  = function(req,res){
	//create and save new User
	//***********
	
   /* if(!req.body) {
        return res.status(400).send({message: "User can not be empty"});
    }*/

var user = new User({
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
    // Find a single user with a userId
    // 
    // Find a single user with a userId
  //  console.log("---------------------params.userId--------------:"req.params.userId);//+ObjectID());
    User.findById(req.params.userId, function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
              //  var _id = mongoose.mongo.ObjectId(req.params.userId);
                return res.status(404).send({message: "useer not found with id " + req.params.userId});                
            }
            return res.status(500).send({message: "Error retrieving user with id " + req.params.userId});
        } 

        if(!user) {
            return res.status(404).send({message: "User not found with id " + req.params.userId});            
        }

        res.send(user);
    });

};

exports.update = function(req, res) {
    // Update a user identified by the userId in the request
    //console.log("---------------------params.userId--------------:"+req.params.userId);

    User.findById(req.params.userId, function(err,user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params.userId});                
            }
            return res.status(500).send({message: "Error finding user with id " + req.params.userId});
        }

        if(!user) {
            return res.status(404).send({message: "User not found with id " + req.params.userId});            
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
                res.status(500).send({message: "Could not update user with id " + req.params.userId});
            } else {
                res.send(data);
            }
        });
    });

};

exports.delete = function(req, res) {
    // Delete a user with the specified userId in the request
    //console.log("---------------------params.userId--------------:"+req.params.userId);
    User.findByIdAndRemove(req.params.userId, function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params.userId + err});                
            }
            return res.status(500).send({message: "Could not delete user with id " + req.params.userId + err});
        }

        if(!user) {
            return res.status(404).send({message: "User not found with id " + req.params.userId + err});
        }

        res.send({message: "User deleted successfully!"})
    });
};