module.exports={
    searchUsers: async (req, res) => {
        // console.log('attemping search for user')
        try {
            console.log(req.params)
        const db = req.app.get('db')
        const {query} = req.params
        const  like = query+'%'
        let users = await db.searchUsers(like)
        console.log(users)
        res.send(users)

        } catch (error) {
        console.log('error finding user', error)
        res.status(500).send(error)
        }
    },
}