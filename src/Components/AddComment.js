import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import DateStamp from './DateStamp';
import axios from 'axios'

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
          // console.log(this.state)
        axios.post('/api/comment', this.state).then(response => {
          // console.log(response)
          this.setState({
            text_content: '',
            img:'',
          })
        })
      }
    
render(){
    return ( 


      <form class="comment-form">

          <textarea class="form-control add-comment-box" id="exampleFormControlTextarea1" rows="3" name="text_content" value={this.state.text_content} onChange={this.handleChange} placeholder="write a comment"></textarea>
          <div class="btn btn-primary" onClick={this.handleClick}>comment</div>

      </form>


    )
}
}
export default AddComment