const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();
const { CONNECTION_STRING, SERVER_PORT: PORT, SECRET} = process.env

// const AWS = require('aws-sdk');

//Controllers
const Auth = require('./controllers/Auth')
const Connect = require('./controllers/Connection')
const Post = require('./controllers/Post')
const Commenting = require('./controllers/Commenting')
const Tools = require('./controllers/Tools')

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

//S3 uploader
app.use('/s3', require('react-s3-uploader/s3router')({
  bucket: process.env.S3_BUCKET,
  region: process.env.REGION, //optional
  headers: {'Access-Control-Allow-Origin': '*'}, // optional
  ACL: 'public-read', // this is default
  uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
})); 

app.use(express.static(`${__dirname}/../build`));

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
  app.put('/auth/profile/update/:id', Auth.update)
  // Deactivate account ---WILL NEED TO ADD ACTIVE COLUMN AND MAY NEED TO UPDATE CONNECTION TABLE IN SAME FUNCTION
//   app.post('/auth/deactivate/:id', Auth.deactivate)


//Connection Management
  //Get Sent Requests
  app.get('/api/sentrequests', Connect.getSentRequests)
  //Friend Request
  app.post('/api/friend/request/:id', Connect.createRequest)
  //Get User Unaccepted Request
  app.get('/api/friend/requests',Connect.getRequests)
  //Accept Friend Request -- this might should be a put but it works as is
  app.post('/api/friend/accept/:id', Connect.acceptRequest)
  //Get Friends (all)
  app.get('/api/friends/all/:id', Connect.getFriends)
  //Get Friends (all)
  app.get('/api/friendsids/all', Connect.getFriendIds)
  //Get Friend (single)
  app.get('/api/friend/:id', Connect.getFriend)


//Posting
  //Create Post
  app.post('/api/post', Post.create)
  //Get Single Users Posts (all)
    //Should work for both current user and connections depending on which id is passed through
  app.get('/api/posts/all/:id',Post.getUserPosts)
  //Get all posts available to you
  app.get('/api/posts/wall',Post.getAllPosts)
  //Get Post (single) should change to come from params
  app.post('/api/posts/post',Post.getSinglePost)

//Commenting
  //create a comment
  app.post('/api/comment', Commenting.create)
  app.get('/api/comment/get/all/:id', Commenting.getAllComments)
  app.delete('/api/comment/destroy/:id',Commenting.destroyComment)

// Seaching
  app.get('/api/search/:query', Tools.searchUsers)

app.listen(PORT, () => {
console.log(`listening on port: ${PORT}`)
})