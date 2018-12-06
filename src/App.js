import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { connect } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router-dom'
import {userLoggedIn, getRequests, getSentRequests, getFriendIds} from './Ducks/reducer'

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
        isLoading: true,
        user:{}

      }
    }
    async componentWillMount() {
      await axios.get('/auth/currentUser').then(response => {
        if (response.data) {
          this.props.userLoggedIn(response.data)
        }
        this.setState({
          isLoading: false
        })
      })

      axios.get(`/api/friendsids/all`).then(response => {
        if (response.data) {
          // this.props.getSentRequests(response.data)
          let friendIds = []
          for(let i=0; i<response.data.length; i++){
            // console.log(1010101, response.data[i].requestee_id)
            friendIds.push(response.data[i].id)
          }
          this.props.getFriendIds(friendIds)
        }
        // console.log(1010101, response.data)
      })
      
      axios.get(`/api/sentrequests`).then(response => {
        if (response.data) {
          // this.props.getSentRequests(response.data)
          let sentReq = []
          for(let i=0; i<response.data.length; i++){
            // console.log(1010101, response.data[i].requestee_id)
            sentReq.push(response.data[i].requestee_id)
          }
          this.props.getSentRequests(sentReq)
        }
        // console.log(1010101, response.data)
      })
      axios.get('/api/friend/requests').then(response => {
        if (response.data) {
          this.props.getRequests(response.data)
        }
        this.setState({
          isLoading: false
        })
      })

  }
  render() {
    return (
      <div className="App">
      <HashRouter>
        <div>
          <Header/>
          <Switch>
            <Route path="/register"component={Register} />
            <Route path="/profile/:id"component={Profile} />
            {/* if logged in show wall  if not show login page */}
            <Route  path="/"
              render={props => (
                this.props.isAuthenticated === true ? 
                  <Wall/> :
                  <Login/>
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
let {user,requests,isAuthenticated, sentRequests, friendIds} = state
return {
  user,
  requests,
  isAuthenticated,
  sentRequests,
  friendIds
}
}

export default connect(mapStateToProps, { userLoggedIn, getRequests, getSentRequests, getFriendIds })(App);
