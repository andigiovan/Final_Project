import React, { Component } from 'react'
import {withRouter, Link, NavLink} from 'react-router-dom'
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
    import {onLogoutUser, searchKeyword} from '../actions/index'

class Header extends Component {

  onSearchSubmit = (e) => {
    e.preventDefault()
    this.props.searchKeyword(this.keyword.value)
    if (this.keyword.value) {
        this.props.history.push("/figurelist")
    }

  }

  render() {
        
    if (!this.props.user_name) {
     
      return (
     
        <div>
        
          <Navbar className="shadow-sm header" light expand="md">
            <Link className="navbar-brand logo" to="/">
                  
        <h2 className="pb-0">
        
        <img className="image mb-4" src="https://conferencephilosophyoflaw.files.wordpress.com/2012/12/logo_szare_duze2.png" alt=""/>
        
          <span className="ml-2">
        ParaTokoH
        </span> 
        </h2>

                  
              
    </Link>
              
      <Nav className="ml-auto" navbar>
                  
                  
        <NavItem className="text-right">
        <NavLink to='/figurelist'>
                <Button className='topnav-right btn-sm' color="link"> ParaTokoH</Button>
             </NavLink>
        <NavLink to='/register'>
                <Button className='topnav-right btn-sm' color="link">Create Account</Button>
             </NavLink>
            <NavLink to='/login'>
                <Button className='topnav-right btn-sm' color="link">Log in</Button>
            </NavLink>
                
                  

               
          <Form className="mt-3" inline>
          
          <input ref={(input)=>{this.keyword = input}} className="form-control-sm" type="text" name="Search" placeholder="Search Paratokoh" />
          <Button onClick={this.onSearchSubmit} className="ml-2 topnav-right btn-sm" outline color="primary">Search</Button>{' '}
                    
            </Form>
                      
                      
        </NavItem>
      </Nav>
              
  </Navbar>

            
 </div>
        )
        }
        else if (this.props.role === "admin") {
            return(
              <div>
            <Navbar color="light" light expand="md">
              <Link className="navbar-brand logo" to="/">
                  
                  <h2 className="pb-0">
                  <span></span>
                  <img className="image mb-4" src="https://conferencephilosophyoflaw.files.wordpress.com/2012/12/logo_szare_duze2.png" alt=""/>
                  
                  <span className="ml-2">
                  ParaTokoH
                  </span> 
                  </h2>

                  
              
              </Link>
              
                <Nav className="ml-auto" navbar>
                  
                  
                  <NavItem className="text-right">
                  
                  <NavLink to='/figurelist'>
                      <Button className='topnav-right btn-sm' color="link">ParaTokoH</Button>
                      </NavLink>
                      <NavLink to='/figureedit'>
                      <Button className='topnav-right btn-sm' color="link">Post</Button>
                      </NavLink>
                        <NavLink to='/adminpage'>
                        <Button className='topnav-right btn-sm' color="link">{this.props.user_name}</Button>
                        </NavLink>
                      
                      
                      <NavLink to='/login'>
                          
                      <Button className='topnav-right btn-sm' onClick={this.props.onLogoutUser} color="link">Log Out</Button>
                      </NavLink>
                      
                  

                      
                    <Form className="mt-2 justify-content-end" inline>
                    
                    <input ref={(input)=>{this.keyword = input}} className="form-control-sm" type="text" name="Search" placeholder="Search Paratokoh" />
                    <Button onClick={this.onSearchSubmit} className="ml-2 topnav-right btn-sm" outline color="primary">Search</Button>{' '}
                    
                      </Form>
                      
                      
                  </NavItem>
                </Nav>
              
            </Navbar>

            
          </div>
            )
        } 
        
        else {
          return (
            <div>
            <Navbar color="light" light expand="md">
              <Link className="navbar-brand logo" to="/">
                  
                  <h2 className="pb-0">
                  <span></span>
                  <img className="image mb-4" src="https://conferencephilosophyoflaw.files.wordpress.com/2012/12/logo_szare_duze2.png" alt=""/>
                  
                  <span className="ml-2">
                  ParaTokoH
                  </span> 
                  </h2>

                  
              
              </Link>
              
                <Nav className="ml-auto" navbar>
                  
                  
                  <NavItem className="text-right">
                  <NavLink to='/figurelist'>
                      <Button className='topnav-right btn-sm' color="link">ParaTokoH</Button>
                      </NavLink>
                      <NavLink to='/figureedit'>
                      <Button className='topnav-right btn-sm' color="link">Post</Button>
                      </NavLink>
                        <NavLink to='/premium'>
                        <Button className='topnav-right btn-sm' color="link">{this.props.user_name}</Button>
                        </NavLink>
                      
                      
                      <NavLink to='/login'>
                          
                      <Button className='topnav-right btn-sm' onClick={this.props.onLogoutUser} color="link">Log Out</Button>
                      </NavLink>
                      
                  

                      
                    <Form className="mt-2 justify-content-end" inline>
                    
                    <input ref={(input)=>{this.keyword = input}} className="form-control-sm" type="text" name="Search" placeholder="Search Paratokoh" />
                    <Button onClick={this.onSearchSubmit} className="ml-2 topnav-right btn-sm" outline color="primary">Search</Button>{' '}
                    
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
    user_name: state.auth.username,
    role: state.auth.role  
  }
}

export default withRouter(connect(mapStateTProps,{onLogoutUser, searchKeyword})(Header))

