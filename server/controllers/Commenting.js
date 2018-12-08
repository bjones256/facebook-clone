module.exports = {
    // create a comment on post
        create: async (req, res) => {
          try {
              
            const db = req.app.get('db')
            let { text_content,img, post_id } = req.body;
            // console.log(1111,req.body)
            let created_at = Date.now()
            // let { user_id,created_at } = req.body
            let { id: user_id } = req.session.user
            // let user_id = 46
            console.log(2222)
        
            let comments = await db.createComment({ user_id, post_id, img, text_content, created_at })
            // console.log('created comment')
            res.send(comments)
            // console.log(comments)
          } catch (error) {
            console.log('error adding comment:', error)
            res.status(500).send(error)
          }
        },
        getAllComments: async (req, res) => {
            // console.log('attemping to pull all posts')
            try {
            const db = req.app.get('db')
            const {id} = req.params
            let comments = await db.getAllComments(id)
            comments.unshift(id)
            res.send(comments)
            // console.log(comments)
            } catch (error) {
            console.log('error getting comments:', error)
            res.status(500).send(error)
            }
        },
        destroyComment: (req,res) =>{
          try {
            const db = req.app.get('db')
            const {id} = req.params
            db.destroyComment(id).then(dbRes => {
              res.status(200).send(dbRes)
          })
          } catch (error) {
            console.log('error destroying comment:', error)
            res.status(500).send(error)
          }
        }
    }