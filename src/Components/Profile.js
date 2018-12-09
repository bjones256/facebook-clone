import React, {Component} from 'react'
import { Redirect, Link, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { userLoggedOut } from '../Ducks/reducer'
import Post from './Post';
import Timeline from './Timeline';
import About from './About';
import Friends from './Friends';
import Photos from './Photos';

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
loadProfile(val) {
    let { id } = val ? val : this.props.match.params
    // console.log('Id in load profile', id)
    axios.get(`/api/friend/${id}`).then(response => {
        if (response.data[0].id === +this.props.match.params.id) {
            this.setState({
            viewedUser: response.data[0]
            })
        }
        })
    
    axios.get(`/api/friends/all/${id}`).then(response => {
        if (response.data[0] === this.props.match.params.id) {
            response.data.shift()
            this.setState({
            friends: response.data
        })
        }
    })

    axios.get(`/api/posts/all/${id}`).then(response => {
        if (response.data[0] === this.props.match.params.id) {
            response.data.shift()
            this.setState({
            posts: response.data
        })
        }
    })

    }
    changeProfile = () => {
        this.loadProfile()
    }

render(){
    let displayPosts;
    let requestIds = [];

    for(let i=0;i<this.props.requests.length; i++){
        requestIds.push(Number(this.props.requests[i].requester_id))
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
        displayPosts = <div class="card">Friend Request has been sent</div>
        }
// if not have they sent you one?
    else if(requestIds.indexOf(Number(this.state.viewedUser.id)) > -1){
        displayPosts = <div class="card">Accept Friend Request <button class="btn btn-primary">Accept</button></div>
    }
    else{

        displayPosts = <div class="card">Send a Friend Request <button class="btn btn-primary" onClick={() => {
            axios.post(`/api/friend/request/${this.state.viewedUser.id}`).then(response => {
            })
        }}> Send Request</button></div>
    }
}

    // let {first_name, last_name, email, phone, profile_img} = this.props.user
    return (
        !this.props.isAuthenticated ? 
        <Redirect to="/login"/> :
        <div class="col-xs-12 page-container">
{/* PROFILE PAGE HEADER   */}
        <div class="profile-header col-xs-12">
            {/* <img src={background_image}/> */}
            <img alt={this.state.viewedUser.fisrt_name} src={this.state.viewedUser.profile_img}/>
            <h3>{this.state.viewedUser.first_name} {this.state.viewedUser.last_name}</h3>
        </div>
        <div class="col-xs-12 profile-nav">
        <div class="col-sm-4">
        
        </div>
        <div class="col-xs-3 col-sm-2 profile-nav-link">
        <Link to={`/profile/${this.state.viewedUser.id}`}>Timeline</Link>
        </div>
        <div class="col-xs-3 col-sm-2 profile-nav-link" onClick={this.changePage}>
        <Link to={`/profile/${this.state.viewedUser.id}/about`} viewedUserId={this.state.viewedUser.id}>About</Link>
        </div>
        <div class="col-xs-3 col-sm-2 profile-nav-link">
        <Link to={`/profile/${this.state.viewedUser.id}/friends`}>Friends</Link>
        </div>
        <div class="col-xs-3 col-sm-2 profile-nav-link last">
        <Link to={`/profile/${this.state.viewedUser.id}/photos`}>Photos</Link>
        </div>
        </div>
{/* LEFT SIDE BAR */}
         <div class='col-xs-12 col-md-3 left-sidebar'>

    {/* PROFILE INFO BLOCK */}
            <div class="col-xs-12 card profile-info">
                <div>{this.state.viewedUser.first_name} {this.state.viewedUser.last_name}</div>
                <div>{this.state.viewedUser.email}</div>
                <div>{this.state.viewedUser.phone}</div>
            </div>
    {/* FRIENDS BLOCK */}
         <div class="col-xs-12 card profile-friends">
            { this.state.friends.slice(0, 9).map( friend => {
                return (                
                <div class="col-xs-4 friend-img-container" >
                    <Link to={{ pathname: `/profile/${friend.id}`}} onClick={()=>(this.changeProfile(friend.id))}>                
                        <img alt={friend.first_name} class="friend-img" src={friend.profile_img}/>
                        <p>{friend.first_name} {friend.last_name}</p>
                    </Link>
                </div>
                )
            })}
        </div>
        </div>
{/* MAIN POST CONTAINER */}
<div id="timeline" class="col-md-7">
<Switch>
    <Route exact path={`/profile/${this.state.viewedUser.id}`} render={() => <Timeline displayPosts={displayPosts} user_id ={this.props.user.id} viewedUser={this.state.viewedUser}/>}/>
    <Route path={`/profile/${this.state.viewedUser.id}/about`} render={() => <About viewedUser={this.state.viewedUser}/>}/>
    <Route path={`/profile/${this.state.viewedUser.id}/friends`} render={() => <Friends friends={this.state.friends} viewedUser={this.state.viewedUser} loadProfile={this.loadProfile} changeProfile={this.changeProfile}/>}/>
        <Route path={`/profile/${this.state.viewedUser.id}/photos`} render={() => <Photos posts={this.state.posts} viewedUser={this.state.viewedUser}/>}/>
</Switch>

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