  //Friend Request
    // Verify active or sent connection exists
    // insert into friends table
    // (requester_id, requestee_id, is_active (set to false),status (set sent)) 
  //Accept Friend Request
    // Access request by connection id
        //if accepting set is_active (to true) and status to (accepted)
  //Deactivate Friendship
    // Access connection by connection id
        // set is_active to false   
  //Get Friends (all)
    // get current user id
    // query both requester_id and requestee_id columns and is_active is true
    // join tables
    // return users excluding user where id equals currentUser
  //Get Friend (single)
    // get friend id from params
    // confirm active connection
    // return user
        //if returning friends page may need to join everything in sql file
        //should be able to repurpose the code that gets currentUsers wall