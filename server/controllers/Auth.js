const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req,res) => {
        try {
        const db = req.app.get('db')
        const {first_name, last_name, email, password, phone, profile_img} =req.body

        let userResponse = await db.getUserByEmail(email)

        if (userResponse[0]) {
            return res.status(409).send('this email is already registered')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let response = await db.createUser( {first_name, last_name, email, hash, phone, profile_img} )
        let newUser = response[0]

        delete newUser.hash

        req.session.user = newUser
        res.send(newUser)

        } catch (error) {
            console.log('error registering account:', error)
            res.status(500).send(error)
        }
    },
    login: async (req,res) =>{
        try {
        const db = req.app.get('db')
        const {email,password} = req.body

        let userResponse = await db.getUserByEmail(email)
        let user = userResponse[0]

        if (!user) {
            return res.status(401).send('Email not found')
        }

        const isAuthenticated = bcrypt.compareSync(password,user.hash)

        if(!isAuthenticated) {
            return res.status(403).send('Password does not match')
        }

        delete user.hash
        req.session.user = user
        res.send(req.session.user)
        } catch (error) {
            console.log('error logging into account:', error)
            res.status(500).send(error)
        }
    },
    // getCurrentUser: (req,res) =>{
    //     try {
    //     const db = req.app.get('db')
    //     } catch (error) {
    //         console.log('error logging registering account:', error)
    //         res.status(500).send(error)
    //     }
    // },
    // logout: (req,res) =>{
    //     try {
    //     const db = req.app.get('db')
    //     } catch (error) {
    //         console.log('error logging registering account:', error)
    //         res.status(500).send(error)
    //     }
    // },
    // update: (req,res) =>{
    //     try {
    //     const db = req.app.get('db')
    //     } catch (error) {
    //         console.log('error logging registering account:', error)
    //         res.status(500).send(error)
    //     }
    // }
}