import React, {Component} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { userLoggedIn } from '../Ducks/reducer'
// import StepOne from './StepOne'
// import StepTwo from './StepTwo'
// import StepThree from './StepThree'

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
    
    <div>
        <h3>"This is the <strong>Login</strong> component"</h3>

        <input type="text" name="email" value={email} onChange={this.handleChange} placeholder="email"/>
        <input type="text" name="password" value={password} onChange={this.handleChange} placeholder="password"/>

        <button onClick={this.handleClick}>submit</button>
        {/* <Switch>
        <Route path="/register/step2/3" render={(props) => <StepTwo {...this.state} handleChange={this.handleChange} />}/>
        <Route path="/register/step3/3" render={(props) => <StepThree {...this.state} />}/>
        <Route path="/register" render={(props) => <StepOne {...this.state} />}/>
        </Switch> */}

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