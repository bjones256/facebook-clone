import React, {Component} from 'react';
import { Button,Navbar,FormControl,FormGroup,NavItem, Nav} from 'react-bootstrap';

class Header extends Component{
render(){
    return (

        <Navbar>
            <Navbar.Header>
            <Navbar.Brand>
                <a href="#home">fakebook</a>
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
            <i class="fa fa-user" aria-hidden="true"></i>
                Profile
            </NavItem>
            <NavItem eventKey={2} href="#">
                Home
            </NavItem>
            <NavItem>
                <i class="fa fa-users" aria-hidden="true"></i>
            </NavItem>
            <NavItem>
                
                <i class="fa fa-bell" aria-hidden="true"></i>
                <p class="count">3</p>
            </NavItem>
            </Nav>

        </Navbar.Collapse>
        
      </Navbar>


)}}

export default Header