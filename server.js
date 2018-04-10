const express  = require('express')
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var dbconfig   = require('./config/database.config.js');
var methodOverride = require('method-override');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

require('./app/routes/User.routes.js')(app);


mongoose.connect(dbconfig.url);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

mongoose.connection.on('error', function(){
	console.log('Could not connect to the databese. Exiting now....');
	process.exit();
});


mongoose.connection.once('open', function(){
	console.log("Successfully connected to the database");
});

//create express app



app.get('/', function(req,res){
	res.json({"message": "welcome to CORDIGIX"});
})

app.listen(3000, function() {
  console.log('listening on 3000')
})