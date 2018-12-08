import React, {Component} from 'react'
import PostForm from './PostFrom';


class Timeline extends Component{

render(){
    return (
        <div>
        <div class='col-xs-12'>
        <PostForm
        viewedUser={this.props.viewedUser.id}
        user_id={this.props.user_id}
        />
    </div>
<div>{this.props.displayPosts}</div></div>
    )
}
}
export default Timeline