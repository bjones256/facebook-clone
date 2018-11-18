import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

// Components
import Header from './Components/Header'
import Wall from './Components/Wall'
import Profile from './Components/Profile'
import Login from './Components/Login'
import Register from './Components/Registration/Register'




class App extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: false
    }
  }
  render() {
    return (
      <div className="App">
      <HashRouter>
        <div>
          <Header/>
          <Switch>
{/* inside of if statement if user logged in */}
          <Route path="/login" component={Login} />
          <Route path="/register"component={Register} />
          <Route path="/wall"component={Wall} />
          <Route path="/profile"component={Profile} />


          </Switch>
        </div>
      </HashRouter>
      </div>
    );
  }
}

export default App;
