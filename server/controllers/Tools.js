module.exports={
    searchUsers: async (req, res) => {
        // console.log('attemping search for user')
        try {
        const db = req.app.get('db')
        const {query} = req.params
        let users = await db.searchUsers(query)
        res.send(users)

        } catch (error) {
        console.log('error finding user', error)
        res.status(500).send(error)
        }
    },
}