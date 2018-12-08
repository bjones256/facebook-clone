const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req,res) => {
        try {
        const db = req.app.get('db')
        // console.log('registering user')
        //get info from req body
        const {first_name, last_name, email, password, phone, profile_img} =req.body
        // console.log(req.body)
        // see if email is already in use
        let userResponse = await db.getUserByEmail(email)
        //if anything is returned email is already in use
        if (userResponse[0]) {
            return res.status(409).send('this email is already registered')
        }
        // generate salt and apply to password then hash
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        //send user info and new hash to the database
        let response = await db.createUser( {first_name, last_name, email, hash, phone, profile_img} )
        // database will return the newly created user
        let newUser = response[0]
        // remove users hash before saving to session
        delete newUser.hash
        // add user info to the session rather than making them log in after registration
        req.session.user = newUser
        //send user info back to client
        res.send(newUser)
        // console.log(newUser)

        } catch (error) {
            console.log('error registering account:', error)
            res.status(500).send(error)
        }
    },
    login: async (req,res) =>{
        try {
            // console.log('attempting to login in user')
        const db = req.app.get('db')
        // get info from req body
        const {email,password} = req.body
        // make sure email exists on database
        let userResponse = await db.getUserByEmail(email)
        //if email exists user object should be returned
        let user = userResponse[0]
        //if not send an error
        if (!user) {
            return res.status(401).send('Email not found')
        }
        //compare the password entered hashed to the stored hash
        const isAuthenticated = bcrypt.compareSync(password,user.hash)

        //if hashes don't match send error
        if(!isAuthenticated) {
            return res.status(403).send('Password does not match')
        }
        // remove user hash before storing to session
        delete user.hash
        req.session.user = user
        // console.log(req.session.user)
        res.send(req.session.user)
        } catch (error) {
            // console.log('error logging into account:', error)
            res.status(500).send(error)
        }
    },
    getCurrentUser: (req,res) => {
        res.send(req.session.user)
    },
    logout: (req,res) =>{
        // console.log('destorying session')
        req.session.destroy()
        // console.log('session destroyed')
        res.sendStatus(200)
    },
    update: async (req,res) =>{
        try {
        const db = req.app.get('db')
        console.log("right here------",req.body)
        const {first_name, last_name, email ,id,profile_img, phone} = req.body
        console.log(email,first_name,last_name,id,profile_img)
        let updateUser = await db.updateUser({first_name, last_name, email , id, profile_img, phone})
        console.log(99999999,updateUser)
        res.send(updateUser)

        } catch (error) {
            console.log('error updating account:', error)
            res.status(500).send(error)
        }
    },
    // deactivate: (req,res) =>{

    // }
}