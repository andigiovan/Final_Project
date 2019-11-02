import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { 
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
    FormText 


} from 'reactstrap';

import {onLoginUser} from '../actions/index'

class Login extends Component {

 

    onLoginClick = (e) => {
        e.preventDefault()
        let username = this.username.value
        let password = this.password.value
        this.props.onLoginUser(username, password)
    }



   
    render() {
        if (!this.props.user_name) {
            return (
               <div>
                        <h1 className="border-bottom shadow-sm logo col-12">
                            Log In
                        </h1>
             
                        
                            
                        
                        <div className="form col-lg-3 col-md-4 col-sm-4">
                            <div className="mt-5 mb-2">Username</div>
                            <Form onSubmit={this.onLoginClick}>
                            <input ref={(input) => {this.username = input}} className="form-control-sm w-100 mb-2" type="text" name="username" placeholder="Enter your username" />
                            
                            <div className="mb-2">Password</div>
                            <input ref={(input) => {this.password = input}} className="form-control-sm w-100" type="password" name="password" placeholder="Enter your password" />
                            
                            <div>
                                <button className="mt-4 btn btn-block btn-primary font-weight-bold mb-3 buttonLogin" onClick={this.onLoginClick}>
                                    
                                  <span className="loginRegister">
                                  Log In
                                  </span>
                                    
                                    </button>
                            </div>
                            </Form>
                           
                        </div>
                            
                
                            
                            
                            
                </div>
              
             
            )
        } else {
            return <Redirect to="/"/>
        }
    }

}

const mapStateToProps = state => {

    return {
        user_name: state.auth.username
    }
}

export default connect(mapStateToProps,{onLoginUser})(Login)
                            
                        
                   