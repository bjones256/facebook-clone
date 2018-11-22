import React, {Component} from 'react'
import DateStamp from './DateStamp';

class Post extends Component{

render(){
    let {text_content,img,created_at,profile_img,first_name,last_name} = this.props
    return (
        
        <div>
        {/* // !this.props.isAuthenticated ? 
        // <Redirect to="/login"/> : */}
        <div class="card">
        <div class="post-info">
            <img class="post-info-img" src={profile_img}/>
            <p class="post-owner">{first_name} {last_name}</p>
            <br/>
            <DateStamp date={created_at}/>
        </div>
            <img class="card-img-top" src={img} alt="Card image cap"/>
            <div class="card-body">


                <p class="card-text">{text_content}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        </div>
    )
}

}

export default Post