module.exports = {

//Friend Request
    // Verify active or sent connection exists
    // insert into connections table
    // (requester_id, requestee_id, is_active (set to false),status (set sent)) 
    getSentRequests: async (req, res) => {
      try{
      // console.log("looking for connections")
      const db = req.app.get('db')
      let {id} = req.session.user
      let connections = await db.getSentRequests(id)
      res.send(connections)
      // console.log(connections)
      } catch (error) {
        console.log('error getting connections', error)
        res.status(500).send(error)
      }
    },
    getFriendIds: async (req, res) => {
      try{
      // console.log("looking for friend ids")
      // console.log(req.session.user)
      const db = req.app.get('db')
      let {id} = req.session.user
      console.log(id)
      let friendIds = await db.getFriendIds(id)
      res.send(friendIds)
      // console.log(friendIds)
      } catch (error) {
        console.log('error getting friendIds', error)
        res.status(500).send(error)
      }
    },
      // send friend request
          createRequest: async (req, res) => {
            try {
              const db = req.app.get('db')
  //need to insert check to verify connection doesn't exist already
  // console.log(req.params, req.session.user)
              let {id: requestee_id} = req.params;
              let {id: requester_id} = req.session.user

              let is_active = false
              let status = "sent"
              let request = await db.friendRequest({ requester_id, requestee_id, is_active, status })
              // console.log('sent friend request')
              res.send(request)
            } catch (error) {
              console.log('error sending friend request:', error)
              res.status(500).send(error)
            }
          },
    //Get Friend Requests for user
          getRequests: async (req,res) =>{
            try {
              // console.log('getting this users friend requests', req.session.user)
              const db = req.app.get('db')
              let { id } = req.session.user
              // let id = id
              let requests = await db.getRequests(id)
              res.send(requests)
            } catch (error) {
              console.log('error getting all friend requests for users:', error)
              res.status(500).send(error)
            }
          },
    //Accept Friend Request
          acceptRequest: async (req, res) => {
            try {
              // console.log('accepting friend request')
              const db = req.app.get('db')
                 // Access request by connection id
            // Probably want to verify that user is session.user
              let {id} = req.params
              let is_active = true
              let status = "accepted"
                //if accepting set is_active (to true) and status to (accepted)
              // console.log(id,status, is_active)
              let accept = await db.friendAccept({ id, is_active, status })
              // console.log('friend request accepted')
              res.send(accept)
            } catch (error) {
              console.log('error accepting friend request:', error)
              res.status(500).send(error)
            }

          },
    //Get Friends (all)
      // get current user id
      // query both requester_id and requestee_id columns and is_active is true
      // join tables
      // return users excluding user where id equals currentUser
          getFriends: async (req,res) => {
            try {
              // console.log(1111,'getting friends', req.params)
              const db = req.app.get('db')
      // pull id from session when front end is up and running

              let {id} = req.params

              let friends = await db.getFriends(id)
              friends.unshift(id)
              res.send(friends)
              
            } catch (error) {
              console.log('error getting friends:', error)
              res.status(500).send(error)
            }
          },
          getFriend: async (req,res) => {
            try {
              // console.log(999,'getting friend', req.params)
              const db = req.app.get('db')
      // pull id from session when front end is up and running

              let {id} = req.params

              let friend = await db.getFriendById(id)
              res.send(friend)
              
            } catch (error) {
              console.log('error getting your friend:', error)
              res.status(500).send(error)
            }
          }
          

  //Get Friend (single)
    // get friend id from params
    // confirm active connection
    // return user
        //if returning friends page may need to join everything in sql file
        //should be able to repurpose the code that gets currentUsers wall
  // Deactivate Friendship
    // Access connection by connection id
        // set is_active to false   
}