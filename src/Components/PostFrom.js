import React, {Component} from 'react';
import axios from 'axios';

class PostForm extends Component{
    constructor(){
        super()
        this.state={
            text_content:''
        }
    }
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({
          [name]: value 
        })
      }
      handleClick = () => {

        axios.post('/api/post', this.state).then(response => {

          this.setState({
            text_content: ''
          })
        })
      }

render(){
  let {viewedUser, user_id} = this.props
  if(viewedUser === user_id){
    return(
      <form>
        <div class="form-group card create-post">
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="text_content" value={this.state.text_content} onChange={this.handleChange}></textarea>
          <div class="btn btn-primary create-post-btn" onClick={this.handleClick}>post</div>
        </div>
      </form>
    )}else{return false}   
}
}
export default PostForm