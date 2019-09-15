import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Input,
    Form,
    FormGroup,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
    import {connect} from 'react-redux'
    import {onLogoutUser} from '../actions/index'

class Header extends Component {

  render() {
        
    if (!this.props.user_name) {
     
      return (
     
        <div>
        
          <Navbar className="shadow-sm header" light expand="md">
            <Link className="navbar-brand logo" to="/">
                  
        <h2 className="pb-0">
        <span>
        <img className="image mb-4" src="https://conferencephilosophyoflaw.files.wordpress.com/2012/12/logo_szare_duze2.png" alt=""/>
        </span>
          <span className="ml-2">
        ParaTokoH
        </span> 
        </h2>

                  
              
    </Link>
              
      <Nav className="ml-auto" navbar>
                  
                  
        <NavItem className="text-right">
        <NavLink to='/'>
                <Button className='topnav-right btn-sm' color="link"> Para Tokoh</Button>
             </NavLink>
        <NavLink to='/register'>
                <Button className='topnav-right btn-sm' color="link">Create Account</Button>
             </NavLink>
            <NavLink to='/login'>
                <Button className='topnav-right btn-sm' color="link">Log in</Button>
            </NavLink>
                
                  

               
          <Form className="mt-3" inline>
          
          <input className="form-control-sm" type="text" name="Search" placeholder="Search Paratokoh" />
          <Button className="ml-2 topnav-right btn-sm" outline color="primary">Search</Button>{' '}
                    
            </Form>
                      
                      
        </NavItem>
      </Nav>
              
  </Navbar>

            
 </div>
        )
        } else {
          return (
            <div>
            <Navbar color="light" light expand="md">
              <Link className="navbar-brand logo" to="/">
                  
                  <h2 className="ml-2 pb-0">
                  <span>
                  <img className="image mb-4" src="https://conferencephilosophyoflaw.files.wordpress.com/2012/12/logo_szare_duze2.png" alt=""/>
                  </span>
                  <span className="ml-3">
                  ParaTokoH
                  </span> 
                  </h2>

                  
              
              </Link>
              
                <Nav className="ml-auto" navbar>
                  
                  
                  <NavItem className="text-right">
                  <NavLink to='/'>
                      <Button className='topnav-right btn-sm' color="link">Para Tokoh</Button>
                      </NavLink>
                      <NavLink>
                      <Button className='topnav-right btn-sm' color="link">Akses++</Button>
                      </NavLink>
                      <NavLink to='/login'>
                          <Button className='topnav-right btn-sm' color="link">{this.props.user_name}</Button>
                      <Button className='topnav-right btn-sm' onClick={this.props.onLogoutUser} color="link">Log Out</Button>
                      </NavLink>
                      
                  

                      
                    <Form className="mt-2 justify-content-end" inline>
                    
                    <input className="form-control-sm" type="text" name="Search" placeholder="Search Paratokoh" />
                    <Button className="ml-2 topnav-right btn-sm" outline color="primary">Search</Button>{' '}
                    
                      </Form>
                      
                      
                  </NavItem>
                </Nav>
              
            </Navbar>

            
          </div>
        )
        }
    }

}

const mapStateTProps = state => {
  return {
    user_name: state.auth.username  
  }
}

export default connect(mapStateTProps,{onLogoutUser})(Header)

