import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import DateStamp from './DateStamp';
import Comments from './Comments';
import AddComment from './AddComment';

class Post extends Component{

getImage(){
    let img=this.props.img
    if(img != null){
        return <img class="card-img-top" src={img} alt="Card image cap"/>
    }
}
render(){
    let {text_content,img,created_at,profile_img,first_name,last_name,id,user_id} = this.props
    return ( 
        <div>
        {/* // !this.props.isAuthenticated ? 
        // <Redirect to="/login"/> : */}
        <div class="card">
        <div class="post-info">
        <Link to={{ pathname: `/profile/${user_id}`}}>
            <img class="post-info-img" src={profile_img}/>
            <p class="post-owner">{first_name} {last_name}</p>
            </Link>
            <br/>
            <DateStamp date={created_at}/>
        </div>
        {this.getImage()}
            <div class="card-body">
                <p class="card-text">{text_content}</p>
                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                <Comments
                post_id={this.props.post_id}
                />
                <AddComment
                post_id={this.props.post_id}
                />
            </div>
        </div>

        </div>
    )
}
}
export default Post