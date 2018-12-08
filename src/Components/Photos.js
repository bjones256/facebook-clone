import React, {Component} from 'react'
import {connect} from 'react-redux'

class Photos extends Component{

render(){
    let {posts,viewedUser} = this.props
    return (
<div class="col-md-12 card img-container">
<div class="col-xs-4 profile-imgs"><img class="profile-images-page-img" src={viewedUser.profile_img}/></div>




            { this.props.posts.map( post => {
                if(post.img){
                return (  
                    <div class="col-xs-4 profile-imgs">              
                    <img class="post-img" src={post.img}/>
                    </div>
                )
                }
            })}



</div>
    )
}
}

export default Photos