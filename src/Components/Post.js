import React, {Component} from 'react'

class Post extends Component{

render(){
    let {text_content,img,created_at} = this.props
    return (
        <div>
        {/* // !this.props.isAuthenticated ? 
        // <Redirect to="/login"/> : */}
        <div class="card">
            <img class="card-img-top" src={img} alt="Card image cap"/>
            <div class="card-body">
                <h5 class="card-title">{created_at}</h5>
                <p class="card-text">{text_content}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        </div>
    )
}

}

export default Post