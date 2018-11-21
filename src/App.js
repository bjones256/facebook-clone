import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { connect } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router-dom'
import {userLoggedIn, getRequests} from './Ducks/reducer'


// Components
import Header from './Components/Header'
import Wall from './Components/Wall'
import Profile from './Components/Profile'
import Login from './Components/Login'
import Register from './Components/Registration/Register'


// From App I want to use session data to set state for:
  // CurrentUser
    //first name
  //Friend Requests


  class App extends Component {
    constructor() {
      super()
      this.state = {
        isLoading: false,
        user:{}

      }
    }
  
    componentDidMount() {
      axios.get('/auth/currentUser').then(response => {
        if (response.data) {
          // console.log(response.data)
          this.props.userLoggedIn(response.data)
        }
  
        this.setState({
          isLoading: false
        })
      })
      axios.get('/api/friend/requests').then(response => {
        if (response.data) {
          // console.log(555555,response.data)
          // this.props.userLoggedIn(response.data)
          this.props.getRequests(response.data)
        }
  
        this.setState({
          isLoading: false
        })
      })
    }
  render() {
    // console.log(this.props.user)
    return (
      <div className="App">
      <HashRouter>
        <div>
          <Header/>
          <Switch>
{/* if loggrd in show wall  if not show login page */}
          {/* <Route path="/login" component={Login} /> */}
          <Route path="/register"component={Register} />
          <Route path="/profile"component={Profile} />
          {/* <Route path="/" component={Wall} /> */}

      <Route  path="/"
        // {...props} 
        render={props => (
          this.props.isAuthenticated === true ?
            <Wall/> :
            <Login/>
            // <Redirect to='/login' />
        )} 
      />

          </Switch>
        </div>
      </HashRouter>
      </div>
    );
  }
}
function mapStateToProps(state){
let {user,requests,isAuthenticated} = state
return {
  user,
  requests,
  isAuthenticated
}
}

export default connect(mapStateToProps, { userLoggedIn, getRequests })(App);
