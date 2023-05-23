//Include external modules
const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');

//Create a connection to the online hosted mysql database
const mysqlConnection = mysql.createConnection({
    host       : 'sql7.freesqldatabase.com',
    user       : 'sql7617080',
    password   : 'viasK1CvkH',
    database   : 'sql7617080'
});

//Create an application that can allow to set up a server
const app = express();

//
app.use(session({
    secret: 'thisIsASecret',
    resave: false,
    saveUninitialized: false
}));

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

//Gets the url - http://localhost:3000/ and sends login.html to it
app.get('/', function(req, res) {
    if (req.session.loggedin == true) {
        res.redirect('/homepage');
    } else {
        res.sendFile(path.join(__dirname + '/public/login.html'));
    }
});

//Authenticates the user
app.post('/auth', function(req, res) {
    //Starts by requesting username and password that has been entered
    let username = req.body.username;
    let password = req.body.password;
    //looks through the database to check if the username and password exist, and then redirects or send message
    if(username && password) {
        mysqlConnection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, result) {
            if (error) {
                throw error;
            } 
            if (result.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/homepage');
            } else {
                res.send('Wrong username or password');
            }
            res.end();
        });
    } 
});

//Gets the homepage, which should be the first page after a succesfull login
app.get('/homepage', function(req, res) {
    if (req.session.loggedin == true) {
        res.sendFile(path.join(__dirname + '/public/homepage.html'));
    } else {
        res.send('No access granted');
    }
});

//When clicking on logout button, user should be logged out
app.post('/logout', function(req, res) {
    req.session.loggedin = false;
    req.session.username = null;
    res.redirect('/');
    res.end();
});

//When user is signing up this happens
app.post('/register', function(req, res) {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    if (email && username && password) {
        mysqlConnection.query('INSERT INTO user (email, username, password) VALUES (?, ?, ?)', [email, username, password], function(error) {
            if (error) {
                throw error;
            } else {
                res.redirect('/');
                res.end();
            }
        });
    }
});

app.get('/allUserPlants', function(req, res) {
    let userName = req.session.username;
    mysqlConnection.query('SELECT id FROM user WHERE username = ?', [userName], function (error, result) {
        if (error) {
            throw error;
        } else {
            data = JSON.parse(JSON.stringify(result));
            id = data[0].id
            
            mysqlConnection.query('SELECT * FROM plant WHERE userid = ?', [id], function(error, result) {
                if (error) {
                    throw error;
                } else {
                    res.json(result);
                }
            });
        }
    });
});


//The server listens on port 3000
app.listen(3000);