import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios';

class About extends Component{
    constructor(){
        super()
        this.state={
            email:'',
            first_name:'',
            id:0,
            last_name:'',
            phone:'',
            profile_img:''

        }
    }
    componentWillMount(){
        this.setState({
            email:this.props.user.email,
            first_name:this.props.user.first_name,
            id:this.props.user.id,
            last_name:this.props.user.last_name,
            phone:this.props.user.phone,
            profile_img:this.props.user.profile_img
        })
        }
        handleChange = e => {
            let { name, value } = e.target
            this.setState({
              [name]: value
            })
          }
          handleClick= () => {
            axios.put(`/auth/profile/update/${this.state.id}`, this.state).then(response => {
                let user = response.data
                // this.props.userLoggedIn(user)

              }).catch(err => {
                console.log(err.response)
                this.setState({
                  // error: err.response.data
                })
              })
            }
    
    // need to set up state for current user to edit their information
    // will need axios call to update information if neccessary


render(){
    let {email,first_name,last_name,phone,profile_img,id} = this.props.user
    let {viewedUser} = this.props.viewedUser


            return (
                this.props.viewedUser.id === id ?
                <div class="col-xs-12">
                <div class=" card about-form">
                <input type="text" class="form-control" name="first_name" value={this.state.first_name} onChange={this.handleChange}/>
                <input type="text" class="form-control" name="last_name" value={this.state.last_name} onChange={this.handleChange}/>
                <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.handleChange}/>
                <input type="text" class="form-control" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                {/* <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.handleChange}/> */}
                <button class="btn btn-primary" onClick={this.handleClick}>Save</button>
                <h6>education:UNLV</h6>
                </div>
                </div>
                :
                <div class="col-xs-12">
                <div class=" card about">
                <h4>{this.props.viewedUser.first_name} {this.props.viewedUser.last_name}</h4>
                <h5><strong>email:</strong> {this.props.viewedUser.email}</h5>
                <h5><strong>phone:</strong> {this.props.viewedUser.phone}</h5>
                <h5><strong>education:</strong> UNLV</h5>
                </div>
                </div>
            )
            

    
}
}
function mapStateToProps(state){
    let {user, isAuthenticated} = state
    return {
    isAuthenticated,
    user
    }
    }
    export default connect(mapStateToProps)(About)