const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require('body-parser'); // middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("/"));

const config = require('./config.js');

const multer = require('multer');
const upload = multer();
// const moment = require('moment');






// Route to Homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

// Route to Login Page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
});
// Route to Register Page
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/static/register.html');
});
// Route to Forum Page
app.get('/forum', (req, res) => {
    res.sendFile(__dirname + '/static/forum.html');
});



var register = require('./register.js');
app.post('/register', upload.none(), register.create_user)

var login = require('./login.js');
app.post('/login', upload.none(), login.login)



var forum = require('./forum.js');
app.post('/api/posts', upload.none(), forum.save_post)
app.get('/api/queryposts', upload.none(), forum.query_post)








app.post('/login', (req, res) => {
    // Insert Login Code Here
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);
});







// Function to listen on the port
// app.listen(port, () =>
//     console.log(`This app is listening on port ${port}`);
//     process.env.AWS_SHARED_CREDENTIALS_FILE = config.photoapp_config;);

const { sequelize } = require('./models/database');

app.listen(config.service_port, () => {
    console.log(`This app is listening on port ${config.service_port}`);
    //
    // Configure AWS to use our config file:
    //
    process.env.AWS_SHARED_CREDENTIALS_FILE = config.s3_config;

    sequelize.sync({ alter: false });
});