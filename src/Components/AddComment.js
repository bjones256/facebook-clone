import React, {Component} from 'react';
import axios from 'axios'
import { connect } from 'react-redux'


class AddComment extends Component{
    constructor(props){
        super(props)
        this.state={
            text_content:'',
            img:'',
            post_id: this.props.post_id
        }
    }
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({
          [name]: value 
        })
      }
      handleClick = () => {
        axios.post('/api/comment', this.state).then(response => {
          this.setState({
            text_content: '',
            img:'',
          })
        })
      }
    
render(){
    return ( 

                <div class="comment add-comment">
                    <div class="col-xs-1 comment-profile-img-container"><img class="comment-profile-img" src={this.props.user.profile_img}/>
                    </div>

                    <div class="col-xs-11">
                    <div class="comment-text" ><textarea class="form-control add-comment-box" id="exampleFormControlTextarea1" rows="3" name="text_content" value={this.state.text_content} onChange={this.handleChange} placeholder="write a comment"></textarea></div>
                    </div>
                    <div class="comment-date">
                    </div>

          <div class="btn btn-comment" onClick={this.handleClick}>comment</div>

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

export default connect(mapStateToProps)(AddComment)