module.exports  = function(app){
	var users = require('../controllers/user.controller.js');

	//Create New User
	app.post('/users/add', users.create);

	//Retreive all users
	app.get( '/users', users.findAll);

	//Retrieve a single User with id
	app.get('/users/:_id', users.findOne);

	//Update a User with UserId
	app.put('/users/:_id', users.update);

	//delete a user with _id
	app.del('/users/:_id', users.delete);

	//form to add new User
	app.get('/addUser', function(req,res){
		res.render('../app/views/users/add', {
			messages : {
				error : null,
				success: null
			}
		});
	});
}