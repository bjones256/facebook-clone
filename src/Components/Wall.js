import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { userLoggedOut } from '../Ducks/reducer'
import Post from './Post';
import PostForm from './PostFrom';

class Wall extends Component{
    constructor() {
        super()
        this.state = {
          posts:[],
          friends:[],
  
        }
      }

      componentDidMount() {
        axios.get(`/api/posts/wall`).then(response => {

          if (response.data) {
            this.setState({
                posts: response.data
            })
          }
        })
    }
 
render(){
    // let {first_name, last_name, email, phone, profile_img} = this.props.user
    return (
        !this.props.isAuthenticated ? 
        <Redirect to="/login"/> :
        <div class="col-xs-12 page-container">

{/* LEFT SIDE BAR */}
         <div class='col-md-3'>

        </div>

{/* MAIN CONTAINER */}
        <div class="col-md-7">

           
            {/* CREATE POST */}
            {/* {this.props.user.id === this.state.viewedUserId ?
            return( <div></div> :*/}
                <div class='col-xs-12'>
                    <PostForm
                    user_id={this.props.user.id}
                    />
                </div>
        
            {/* <p>
            I'm expecting the logged in user here:
            <br/>
            this should not change from page to page
            <br/>
            {this.props.user.id}
            </p>
            =
            <p>
            And the profile being viewed here:
            {this.state.viewedUserId}?
            </p> */}
            {/* ALL POSTS */}
                        <div class='col-xs-12 posts-container'>
                        { this.state.posts.map( post => {
                            return (
                            <Post
                            key={post.id}
                            created_at={post.created_at}
                            text_content={post.text_content}
                            img={post.img}
                            profile_img={post.profile_img}
                            first_name={post.first_name}
                            last_name={post.last_name}
                            post_id={post.id}
                            user_id={post.user_id}
                            />
                            )
                        })}

                        </div>

        </div>
        </div>

    )
}

}
function mapStateToProps(state){
    let {user, isAuthenticated} = state
    return {
    isAuthenticated,
    user
    }
    }
    
    export default connect(mapStateToProps,{userLoggedOut})(Wall);