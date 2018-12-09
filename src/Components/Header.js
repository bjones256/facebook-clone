import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Button,Navbar,FormControl,FormGroup,NavItem, Nav} from 'react-bootstrap';
import { userInfo } from 'os';
import { request } from 'https';
import { userLoggedOut } from '../Ducks/reducer'
import axios from 'axios';
import Search from './Search'

class Header extends Component{
    constructor(){
        super()
        this.state = {
            searchResults:[],
            userInput:''
        }
    }
  logOut = () => {
    axios.get('/auth/logout').then(response => {
      this.props.userLoggedOut()
    })
  }

render(){
    let {isAuthenticated, first_name, requests} = this.props
    return (
        !this.props.isAuthenticated ? 
        <Navbar>
            <Navbar.Header>
            <Navbar.Brand>
                <Link to='/'>fakebook</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Navbar.Form pullLeft>
            <div>
            <Search/>
            </div>
            </Navbar.Form>
            </Navbar.Collapse>
        </Navbar> 
      :
        <Navbar>
            <Navbar.Header>
            <Navbar.Brand>
                <Link to='/'>fakebook</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse className="test">
            <Navbar.Form pullLeft>
            <Search/>
            </Navbar.Form>
            <Nav pullRight class="pres">        
            <NavItem eventKey={1} href="#">
                <Link to={{pathname:`/profile/${this.props.user.id}`}} className='white'>
                <i class="fa fa-user" aria-hidden="true"></i>
                            {this.props.user.first_name}
                </Link>
            </NavItem>
            <NavItem eventKey={2} href="#">
            <Link to='/' className='white'>
                Home
            </Link>
            </NavItem>
            <NavItem class="mobile-bottom">
            <Link to={`/profile/${this.props.user.id}/friends`} className='white'>
                <i class="fa fa-users" aria-hidden="true"></i>
            </Link>
            </NavItem>
            <NavItem class="mobile-bottom">
                <li class="dropdown">
                <i id="dropdownMenuLink"class="fa fa-bell dropdown-toggle" role="button" data-toggle="dropdown" aria-hidden="true" ></i>
                <ul class="dropdown-menu friend-requests-dropdown">
                    { requests.map( request => {
                        // return request.requester_id
                        return (
                        <li class="friend-request">
                            <div>
                                <img src={request.profile_img} alt={request.first_name}/>
                                <p>{request.first_name} {request.last_name}</p>
                            </div>
                            <div>
                                <button class="btn btn-primary" 
                                onClick={() => {
                                    axios.post(`/api/friend/accept/${request.id}`).then(response => {
                                    })
                                }}>Accept</button>
                            </div>
                        </li>
                        )
                    })}
                    </ul>
                </li>
                <p class="count">{requests.length}</p>
            </NavItem>
            <NavItem class="mobile-bottom">
                <i class="fa fa-times" aria-hidden="true" onClick={this.logOut}></i>
            </NavItem>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
)}}

function mapStateToProps(state) {
    let { isAuthenticated, user,requests} = state
    return {
      isAuthenticated,
        user,
        requests
    }
  }
  
  export default connect(mapStateToProps,{userLoggedOut})(Header)