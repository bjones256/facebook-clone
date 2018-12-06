import React, {Component} from 'react'
import { Redirect, Link, matchPath, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { userLoggedOut } from '../Ducks/reducer'
import Post from './Post';
import PostForm from './PostFrom';
import Register from './Registration/Register';

class Profile extends Component{
    constructor() {
        super()
        this.state = {
          posts:[],
          friends:[],
          viewedUser:{},
          profilePage:"timeline"
        }
      }
componentWillMount(){
this.loadProfile()
}
componentDidUpdate(prevProps){
if(prevProps.match.params.id !== this.props.match.params.id){
    this.loadProfile()
}
}
checkConnection(){
    if(this.props.user.id === this.state.viewedUser.id){
        return true
    } else{
        return false
    }
}
loadProfile() {
    let { id } = this.props.match.params
    // console.log('Id in load profile', id)
    axios.get(`/api/friend/${id}`).then(response => {
        console.log('Response from first axios call', response)
        if (response.data[0].id === +this.props.match.params.id) {
            this.setState({
            viewedUser: response.data[0]
            })
        }
        })
    
    axios.get(`/api/friends/all/${id}`).then(response => {
        console.log('Response from second axios call', response)

        if (response.data[0] === this.props.match.params.id) {
            response.data.shift()
            this.setState({
            friends: response.data
        })
        }
    })

    axios.get(`/api/posts/all/${id}`).then(response => {
        console.log('Response from third axios call', response)

        if (response.data[0] === this.props.match.params.id) {
            response.data.shift()
            this.setState({
            posts: response.data
        })
        }
    })

    }
    changeProfile(){
        this.loadProfile()
    }

    // changePage = (e) => {
    //     let { name } = e.target
    //     this.state.profilePage
    //     this.setState({
    //         profilePage: name
    //     })
        
    
    //   }

render(){
    let displayPosts;
    let requestIds = [];

    for(let i=0;i<this.props.requests.length; i++){
        requestIds.push(Number(this.props.requests[i].requester_id))
        // console.log(typeof(this.props.requests[i].id))
        // console.log(this.props.requests[i].id, this.state.viewedUser.id)
    }

//See if you've already sent a request to this person
if(this.props.friendIds.indexOf(Number(this.state.viewedUser.id)) > -1 || this.state.viewedUser.id === this.props.user.id){
    displayPosts =
    <div class='col-xs-12 posts-container'>
        { this.state.posts.map( post => {
            return (
            <Post
            created_at={post.created_at}
            text_content={post.text_content}
            img={post.img}
            profile_img={post.profile_img}
            first_name={post.first_name}
            last_name={post.last_name}
            post_id={post.id}
            key={post.id}
            />
            )
        })}
    </div>
}
else{

    if(this.props.sentRequests.indexOf(Number(this.state.viewedUser.id)) > -1){
        displayPosts = <div>Friend Request has been sent</div>
        }
// if not have they sent you one?
    else if(requestIds.indexOf(Number(this.state.viewedUser.id)) > -1){
        displayPosts = <div>Accept Friend Request <button class="btn btn-primary">Accept</button></div>
    }
    else{

        displayPosts = <div>Send a Friend Request <button class="btn btn-primary" onClick={() => {
            axios.post(`/api/friend/request/${this.state.viewedUser.id}`).then(response => {
            })
        }}> Send Request</button></div>
    }
}

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
        <div class="col-xs-12 profile-nav">
        <div class="col-xs-4">
        
        </div>
        <div class="col-xs-2 profile-nav-link">
        <a name="timeline" onClick={this.changePage}>Timeline</a>
        </div>
        <div class="col-xs-2 profile-nav-link" onClick={this.changePage}>
        <a  name="about" onClick={this.changePage}>About</a>
        </div>
        <div class="col-xs-2 profile-nav-link">
        <a  name="friends" onClick={this.changePage}>Friends</a>
        </div>
        <div class="col-xs-2 profile-nav-link last">
        <a name="photos" onClick={this.changePage}>Photos</a>
        </div>
        {/* <div class="col-xs-2 profile-nav-link">
        </div> */}
        </div>
{/* LEFT SIDE BAR */}
         <div class='col-md-3'>

    {/* PROFILE INFO BLOCK */}
            <div class="col-xs-12 card profile-info">
                <div>{this.state.viewedUser.first_name} {this.state.viewedUser.last_name}</div>
                <div>{this.state.viewedUser.email}</div>
                <div>{this.state.viewedUser.phone}</div>
            </div>
    {/* FRIENDS BLOCK */}
         <div class="col-xs-12 card profile-friends">
            { this.state.friends.map( friend => {
                return (                
                <div class="col-xs-4 friend-img-container" >
                    <Link to={{ pathname: `/profile/${friend.id}`}} onClick={()=>(this.changeProfile(friend.id))}>                
                        <img class="friend-img" src={friend.profile_img}/>
                        <p>{friend.first_name} {friend.last_name}</p>
                    </Link>
                </div>
                )
            })}
        </div>
        </div>
{/* MAIN POST CONTAINER */}

        <div id="timeline" class="col-md-7">
    {/* CREATE POST */}
            {/* {this.props.user.id === this.state.viewedUser.id ?
            return( <div></div> :*/}

                <div class='col-xs-12'>
                    <PostForm
                    viewedUser={this.state.viewedUser.id}
                    user_id={this.props.user.id}
                    />
                </div>
            
    {/* ALL POSTS */}
    {displayPosts}

        </div>
        </div>
    )
}
}
function mapStateToProps(state){
    let {user, isAuthenticated, sentRequests,requests,friendIds} = state
    return {
    isAuthenticated,
    user,
    sentRequests,
    requests,
    friendIds
    }
    }
    export default connect(mapStateToProps,{userLoggedOut})(Profile);