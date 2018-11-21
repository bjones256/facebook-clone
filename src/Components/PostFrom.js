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


    //   post is working but it appending the url for some reason
      handleClick = () => {
          console.log(this.state)
        axios.post('/api/post', this.state).then(response => {
console.log(response)
          this.setState({
            text_content: ''
          })
        })
      }

render(){
    return(
<form>
  <div class="form-group card">
  {this.props.user_id}
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="text_content" value={this.state.text_content} onChange={this.handleChange}></textarea>
    <div class="btn btn-primary" onClick={this.handleClick}>post</div>
  </div>
</form>
    )
}

}

export default PostForm