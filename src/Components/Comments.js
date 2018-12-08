import React, {Component} from 'react';
// import {Link} from 'react-router-dom'
import DateStamp from './DateStamp';
import axios from 'axios'
import { connect } from 'react-redux'


class Comments extends Component{
    constructor(){
        super()
        this.state={
            comments:[]
        }
    }

    componentWillMount(){
    axios.get(`/api/comment/get/all/${this.props.post_id}`).then(response => {
        // console.log(response.data[0],this.props.post_id)
        if (+response.data[0] === this.props.post_id) {
            response.data.shift()
            // console.log("comments",response.data)
            this.setState({
            comments: response.data
        })
        }
    })
}

deleteComment(id){
// console.log(id)
    axios.delete(`api/comment/destroy/${id}`).then(response => {
        // console.log(1111111111111, response)
        // this.setState({
        //     comments: response.data
        // })
    })
}
//get comments matching on post id and input into array
//map over array and display individual comments under original post


render(){
    // let {text_content,created_at,profile_img,first_name,last_name,id} = this.props
    return ( 
// if current user id is equal to comment user id or post owner id allow delete comment
        // i need a button to press in the comment 
        //that fires a function 
        //that takes comment id and send axios call to api
        //that deletes comment from db
            <div class='col-xs-12 comments-container'>
            
                { this.state.comments.map( comment => {
                    if(comment.user_id === this.props.user.id){
                        return(
                            <div class="comment" key={comment.id}>
                    <div class="col-xs-1 comment-profile-img-container"><img class="comment-profile-img" src={comment.profile_img}/></div>
                    {/* <p class="comment-author" ></p> */}
                    <div class="col-xs-11">
                    <p class="comment-text" ><strong>{comment.first_name} {comment.last_name}</strong> {comment.text_content}</p>
                    </div>
                    <div class="comment-date"><DateStamp date={comment.created_at}/></div>
                    {/* <p class="comment-date" >{comment.created_at}</p> */}
                    <div class="delete-comment"><a role="button" onClick={()=>{this.deleteComment(comment.id)}}><i class="fa fa-times"></i></a></div>
                    </div>)

                    }else{
                    return (
                    <div class="comment" key={comment.id}>
                    <div class="col-xs-1 comment-profile-img-container"><img class="comment-profile-img" src={comment.profile_img}/></div>
                    {/* <p class="comment-author" ></p> */}
                    <div class="col-xs-11">
                    <p class="comment-text" ><strong>{comment.first_name} {comment.last_name}</strong> {comment.text_content}</p>
                    </div>
                    <div class="comment-date"><DateStamp date={comment.created_at}/></div>
                    {/* <p class="comment-date" >{comment.created_at}</p> */}

                    </div>
                    
                    )
                }
                })}

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

export default connect(mapStateToProps)(Comments)