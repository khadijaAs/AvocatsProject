module.exports  = function(app){
	var users = require('../controllers/user.controller.js');

	//Create New User
	app.post('/users', users.create);

	//Retreive all users
	app.get( '/users', users.findAll);

	//Retrieve a single User with userId
	app.get('/users/:userId', users.findOne);

	//Update a User with UserId
	app.put('/users/:userId', users.update);

	//delete a user with userId
	app.delete('/users/:userId', users.delete);
}