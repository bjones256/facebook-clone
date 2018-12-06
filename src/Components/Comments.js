import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import DateStamp from './DateStamp';
import axios from 'axios'

class Comments extends Component{
    constructor(){
        super()
        this.state={
            comments:[]
        }
    }

    componentWillMount(){
    axios.get(`/api/comment/get/all/${this.props.post_id}`).then(response => {
        console.log(response.data[0],this.props.post_id)
        if (+response.data[0] === this.props.post_id) {
            response.data.shift()
            console.log("comments",response.data)
            this.setState({
            comments: response.data
        })
        }
    })
}
//get comments matching on post id and input into array
//map over array and display individual comments under original post


render(){
    let {text_content,img,created_at,profile_img,first_name,last_name,id} = this.props
    return ( 

            <div class='col-xs-12 comments-container'>
                { this.state.comments.map( comment => {
                    return (
                    <div class="comment" key={comment.id}>
                    <div class="col-xs-1 comment-profile-img-container"><img class="comment-profile-img" src={comment.profile_img}/></div>
                    {/* <p class="comment-author" ></p> */}
                    <div class="col-xs-11">
                    <p class="comment-text" ><strong>{comment.first_name} {comment.last_name}</strong> {comment.text_content}</p>
                    </div>
                    {/* <p class="comment-date" >{comment.created_at}</p> */}
                    </div>
                    )
                })}

            </div>

    )
}
}
export default Comments