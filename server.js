const express  = require('express')
var bodyParser = require('body-parser');
var dbconfig   = require('./config/database.config.js');
var mongoose   = require('mongoose');

const app = express();

require('./app/routes/User.routes.js')(app);


mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.url);
mongoose.connection.on('error', function(){
	console.log('Could not connect to the databese. Exiting now....');
	process.exit();
});


mongoose.connection.once('open', function(){
	console.log("Successfully connected to the database");
});

//create express app


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req,res){
	res.json({"message": "welcome to CORDIGIX"});
})

app.listen(3000, function() {
  console.log('listening on 3000')
})