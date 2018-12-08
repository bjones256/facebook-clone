import React, {Component} from 'react'
import { Route, Switch, Redirect,Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { userLoggedIn } from '../Ducks/reducer'
class Login extends Component{
    constructor(){
        super()
        this.state={
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            phone:'',
            profile_img:'',
        }
        this.handleChange=this.handleChange.bind(this)
    }     
  handleChange = e => {
    let { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  handleClick = () => {
    axios.post('/auth/login', this.state).then(response => {
      let user = response.data
      this.props.userLoggedIn(user)
    console.log(user)
    }).catch(err => {
      console.log(err.response)
      this.setState({
        // error: err.response.data
      })
    })
  }
render(){
    let {first_name, last_name, email, password, phone, profile_img, handleChange} = this.state
    
    return (
        this.props.isAuthenticated ? 
    <Redirect to="/"/> :
  <div class="login-box card page-container">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
        <input type="text" name="email" class="form-control" id="exampleInputEmail1" value={email} onChange={this.handleChange} placeholder="email"/>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Password</label>
        <input type="text" name="password" class="form-control" id="exampleInputEmail1" value={password} onChange={this.handleChange} placeholder="password"/>
        <button type="submit" class="btn btn-primary login-button" onClick={this.handleClick}>submit</button>
      <br/>
      <Link to ="/register"><small id="emailHelp" class="form-text text-muted">Create account</small></Link> 
    </div>
  </div>
    )
}
}
function mapStateToProps(state) {
    let { isAuthenticated } = state
    return {
      isAuthenticated
    }
  }
  export default connect(mapStateToProps, { userLoggedIn })(Login)