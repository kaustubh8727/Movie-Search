import React ,{Component} from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
var FontAwesome = require('react-fontawesome');

class Head extends Component {
onLogin(){
  this.props.onLogin();

}
onLogout(){
  this.props.onLogout();
}

  render(){
    let page;
    let user;
    if(this.props.token){
    page=<button className="loginout" onClick={this.onLogout.bind(this)} href="#">Logout</button>
    user=<div><h5>You Are Login as : </h5><h5 className="profilename">{this.props.profile.name}</h5></div>
    }

    else{
    page=<button className="loginout" onClick={this.onLogin.bind(this)} href="#">Login </button>
    user=<h5 >Login to search movies</h5>
    }

    return(
        <Navbar className="nav">
            <Navbar.Brand>
            <img className="heading" src= 'https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg'/>
              <h5>Movie Searcher</h5>
            </Navbar.Brand>
          <Nav>
          <ul>
          {page}
          </ul>
          </Nav>
          <Nav className="user">
          <ul>
          {user}
          </ul>
          </Nav>
        </Navbar>
    );
  }
}

export default Head;
