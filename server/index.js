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
  app.get('/auth/logout', Auth.logout)
  // Get account information
  app.get('/auth/currentUser', Auth.getCurrentUser)
  // Update account information
//   app.post('/auth/update/:id', Auth.update)
  // Deactivate account ---WILL NEED TO ADD ACTIVE COLUMN AND MAY NEED TO UPDATE CONNECTION TABLE IN SAME FUNCTION
//   app.post('/auth/deactivate/:id', Auth.deactivate)


//Connection Management
  //Friend Request
  app.post('/api/friend/request', Connect.createRequest)
  //Get User Unaccepted Request
  app.get('/api/friend/requests',Connect.getRequests)
  //Accept Friend Request -- this might should be a put but it works as is
  app.post('/api/friend/accept', Connect.acceptRequest)
  //Get Friends (all)
  app.get('/api/friends/all', Connect.getFriends)
  //Get Friend (single)

//Posting
  //Create Post
  app.post('/api/post', Post.create)
  //Get Single Users Posts (all)
    //Should work for both current user and connections depending on which id is passed through
  app.post('/api/posts/all',Post.getUserPosts)
  //Get all posts available to you
  app.post('/api/posts/dashboard',Post.getAllPosts)
  //Get Post (single) should change to come from params
  app.post('/api/posts/post',Post.getSinglePost)


app.listen(PORT, () => {
console.log(`listening on port: ${PORT}`)
})