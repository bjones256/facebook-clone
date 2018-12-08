module.exports = {
// create our own post
    create: async (req, res) => {
      try {
          
        const db = req.app.get('db')
        let { text_content,img } = req.body;
        // console.log(req.body)
        let created_at = Date.now()
        let { id: user_id } = req.session.user
        // let user_id = 46
    
        let posts = await db.createPost({ user_id, img, text_content,created_at })
        // console.log('created post')
        res.send(posts)
        // console.log(posts)
      } catch (error) {
        console.log('error creating post:', error)
        res.status(500).send(error)
      }
    },
// read single users posts
    getUserPosts: async (req, res) => {
        // console.log('attemping to pull posts')
        try {
        const db = req.app.get('db')
        const {id} = req.params
        let posts = await db.getUserPosts(id)
        posts.unshift(id)
        res.send(posts)
        } catch (error) {
        console.log('error getting posts:', error)
        res.status(500).send(error)
        }
    },
    // get user and connections posts
    getAllPosts: async (req, res) => {
        // console.log('attemping to pull all posts')
        // console.log('posts', req.session.user)
        try {
        const db = req.app.get('db')
        const {id} = req.session.user
        let posts = await db.getAllPosts()
        res.send(posts)
        // console.log(posts)
        } catch (error) {
        console.log('error getting posts:', error)
        res.status(500).send(error)
        }
    },
    getSinglePost: async (req,res) => {
        try {
        // console.log('attemping to get single post')
        const db = req.app.get('db')
    //this is post id    
        const {id} = req.body
    // need to verify user has rights to view
        let post = await db.getSinglePost(id)
        res.send(post)

        } catch (error) {
        console.log('error getting post:', error)
        res.status(500).send(error)           
        }
    }
// update post
// delete post

// comment on a post
}