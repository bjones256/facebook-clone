const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();
const { CONNECTION_STRING, SERVER_PORT: PORT, SECRET} = process.env

//Controllers
const Auth = require('./controllers/Auth')
const Connect = require('./controllers/Connection')
const Post = require('./controllers/Post')

const app = express()

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected!')
  })

app.use(bodyParser.json());
app.use(session({
    secret: SECRET,
    resave: true,
    saveUninitialized: false
  }))

//Authorization
  // Create account
  app.post('/auth/register', Auth.register)
  // Login to account
  app.post('/auth/login', Auth.login)
  // Logout of account
//   app.get('/auth/logout', Auth.logout)
  // Get account information
//   app.get('/auth/currentUser', Auth.getCurrentUser)
  // Update account information
  // Deacctivate account

//Connection Management
  //Friend Request
  //Accept Friend Request
  //Get Friends (all)
  //Get Friend (single)

//Posting
  //Create Post
  //Get Posts (all)
  //Get Post (single)


app.listen(PORT, () => {
console.log(`listening on port: ${PORT}`)
})