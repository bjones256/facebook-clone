import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { userLoggedOut } from '../Ducks/reducer'
import Post from './Post';
import PostForm from './PostFrom';


class Profile extends Component{
    constructor() {
        super()
        this.state = {
          posts:[],
          friends:[],
          viewedUserId:46,
          viewedUser:{}
  
        }
      }

    //   I need to update the id that is getting passed in here
    // it can be either current user id or friend if
      componentDidMount() {
// on mount i want to update who is being viewed
this.setState({
    viewedUserId:this.props.user.id

})
axios.get(`/api/friend/${this.props.user.id}`).then(response => {
    if (response.data) {
      console.log(response.data)
      this.setState({
          viewedUser: response.data[0]
      })
    }
  })
        axios.get(`/api/posts/all/${this.props.user.id}`).then(response => {
          if (response.data) {
            console.log(response.data)
            this.setState({
                posts: response.data
            })
          }
        })
        axios.get(`/api/friends/all/${this.props.user.id}`).then(response => {
            console.log(1234,this.props.user.id)
            if (response.data) {
              console.log(response.data)
              this.setState({
                  friends: response.data
              })
            }
          })

    }
    newProfile(e) {
        // on mount i want to update who is being viewed
        axios.get(`/api/friend/${e}`).then(response => {
            if (response.data) {
              console.log(response.data)
              this.setState({
                  viewedUser: response.data[0]
              })
            }
          })
                axios.get(`/api/posts/all/${e}`).then(response => {
                  if (response.data) {
                    console.log(response.data)
                    this.setState({
                        posts: response.data
                    })
                  }
                })
                axios.get(`/api/friends/all/${e}`).then(response => {
                    console.log(1234,this.props.user.id)
                    if (response.data) {
                      console.log(response.data)
                      this.setState({
                          friends: response.data
                      })
                    }
                  })
        
            }

    changeProfile(val){
        this.setState({
            viewedUserId: val
        })
        this.newProfile(val)
    }



render(){
    let {first_name, last_name, email, phone, profile_img} = this.props.user
    return (
        !this.props.isAuthenticated ? 
        <Redirect to="/login"/> :
        <div class="col-xs-12">

{/* PROFILE PAGE HEADER   */}

        <div class="profile-header col-xs-12">
            {/* <img src={background_image}/> */}
            <img src={this.state.viewedUser.profile_img}/>
            <h3>{this.state.viewedUser.first_name} {this.state.viewedUser.last_name}</h3>
        </div>

{/* LEFT SIDE BAR */}
         <div class='col-md-3'>

{/* INFO BLOCK */}
            <div class="col-xs-12 card profile-info">

                <div>{this.state.viewedUser.first_name} {this.state.viewedUser.last_name}</div>
                <div>{this.state.viewedUser.email}</div>
                <div>{this.state.viewedUser.phone}</div>
            </div>

{/* FRIENDS BLOCK */}

         <div class="col-xs-12 card">
            { this.state.friends.map( friend => {
                return (
                // onclick these should go to friends profile page
                <div class="col-md-4 friend-img-container" 
                onClick={()=>{this.changeProfile(friend.id)}}>
                <img class="friend-img" src={friend.profile_img}/>
                <p>{friend.first_name} {friend.last_name}</p>

                </div>
                )
            })}
        </div>
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
                            create_at={post.create_at}
                            text_content={post.text_content}
                            img={post.img}
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
    
    export default connect(mapStateToProps,{userLoggedOut})(Profile);