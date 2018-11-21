import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Button,Navbar,FormControl,FormGroup,NavItem, Nav} from 'react-bootstrap';
import { userInfo } from 'os';
import { request } from 'https';
import { userLoggedOut } from '../Ducks/reducer'
import axios from 'axios';

class Header extends Component{

    // This is going to need to move to header
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
                <FormGroup>
                <FormControl type="text" placeholder="Search" />
                </FormGroup>{' '}
                <Button type="submit"><i class="fa fa-search" aria-hidden="true"></i></Button>
            </Navbar.Form>

        </Navbar.Collapse>
        
      </Navbar> :

        <Navbar>
            <Navbar.Header>
            <Navbar.Brand>
                <Link to='/'>fakebook</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Navbar.Form pullLeft>
                <FormGroup>
                <FormControl type="text" placeholder="Search" />
                </FormGroup>{' '}
                <Button type="submit"><i class="fa fa-search" aria-hidden="true"></i></Button>
            </Navbar.Form>


    
            <Nav pullRight>
            
            <NavItem eventKey={1} href="#">
            <Link to='/profile' className='white'>
            <i class="fa fa-user" aria-hidden="true"></i>
                {this.props.user.first_name}
            </Link>
            </NavItem>
            <NavItem eventKey={2} href="#">
            <Link to='/' className='white'>
                Home
            </Link>
            </NavItem>
            <NavItem>
                <i class="fa fa-users" aria-hidden="true"></i>
            </NavItem>
            <NavItem>
                <li class="dropdown">
                <i id="dropdownMenuLink"class="fa fa-bell dropdown-toggle" role="button" data-toggle="dropdown" aria-hidden="true"></i>
                <ul class="dropdown-menu friend-requests-dropdown">
                    { requests.map( request => {
                        // return request.requester_id
                        return (
                        <li class="friend-request">
                        <div>
                        <img src={request.profile_img}/>
                        <p>{request.first_name}</p>

                        </div>
                        <div>
                        <button class="btn btn-primary" 
                         onClick={() => {
                            // let val = request.id
                            // console.log(111,{request.id})
                            axios.post(`/api/friend/accept/${request.id}`).then(response => {
                            //   props.setPosts(response.data)
                            // need to send 
                            console.log('accepted')
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
            <NavItem>
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