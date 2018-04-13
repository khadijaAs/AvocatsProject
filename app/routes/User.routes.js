module.exports  = function(app){
	var users = require('../controllers/user.controller.js');

	//Create New User
	app.post('/users/new', users.create);

	//Retreive all users
	app.get( '/users', users.findAll);

	//Retrieve a single User with id
	app.get('/users/:_id', users.findOne);

	//Update a User with UserId
	app.post('/users/:_id/update', users.update);

	//delete a user with _id
	app.post('/users/:_id', users.delete);// users/ase521rde      ?p=jk&p2=vbhn

	//form to add new User
	app.get('/addUser', function(req,res){
		res.render('../app/views/users/add', {
			messages : {
				error : null,
				success: null
			}
		});
	});

	app.get('/test', function(req,res){
		res.render('../app/views/users/test', {
			messages : {
				error : null,
				success: null
			}
		});
	});
}