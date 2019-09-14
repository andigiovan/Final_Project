import React, { Component } from 'react'
import axios from "axios"
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
 

    onLoginClick = () => {

        let username = this.username.value
        let password = this.password.value

        this.props.onLoginUser(username, password)

     }
   
    render() {
        if (!this.props.user_name) {
            return (
                <div>
    
                    <h1 className="ml-4 border-bottom shadow-sm logo">
                        Log In
                    </h1>
                
                <Form>
                
                <FormGroup>
                <div className="col-sm-3">
                <Label className="ml-2 mt-5">Username</Label>
                </div>
                <div className= "ml-3">
                <input ref={(input) => {this.username = input}} className="ml-2 form-control-sm width" type="text" name="username" placeholder="Enter your username" />
                </div>
                </FormGroup>
                
                <FormGroup>
                <div className="col-sm-3">
                <Label className="ml-2">Password</Label>
                </div>
                <div className="ml-3">
                <input ref={(input) => {this.password = input}} className="ml-2 form-control-sm width" type="password" name="password" placeholder="Enter your password" />
                <Button className=" ml-2 mt-4 btn align-content-between btn-block font-weight-bold width" color="primary" onClick={this.onLoginClick} size="sm" active>Log In</Button>{' '}
                </div>
                </FormGroup>
                </Form>
                
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