import React, { Component } from 'react'
import crypto from "crypto"
import axios from 'axios'
import {withRouter} from 'react-router-dom'

import { 
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
    FormText 


} from 'reactstrap';

class Register extends Component {

    state = {
        error: '',
        success: ''
    }
        
    encryptMyPass = (password) => {
        let result = crypto.createHmac("sha256", "jc10").update(password).digest("hex")
        return result
    }
    

    onRegisterClick = (e) => {
        e.preventDefault()
        this.setState({loading: true})  
        

        let username = this.username.value
        let password = this.encryptMyPass(this.password.value)
        let email = this.email.value

        

        axios.get(
            "http://localhost:4500/auth/getdata",

            {
                params: {
                username: username
                
            }
            }
        
        
    
        ).then((res) => {
            console.log(res.data.length);
            if (username == "" || password == "" || email == "") {
                this.setState({loading:false, error:"Data tidak boleh kosong"})
            }
            
            else if (res.data.length > 0) {
                this.setState({loading:false, error:"Username yang Anda masukkan sudah terdaftar"})
            }
            else {
                axios.get(
                "http://localhost:4500/auth/getdata",
                {
                    params: {
                        email: email
                    }
                }
                ).then((res) => {
                    console.log(res.data.length);
                    
                    if (res.data.length > 0) {
                        this.setState({loading:false, error:"Email yang Anda masukkan sudah terdaftar"})
                    }
                    else {
                        axios.post(
                        
                        
                        "http://localhost:4500/auth/register",
                        {
                            
                                username: username,
                                password: password,
                                email: email
                                
                            
                        }
                        ).then(() => {
                            this.setState({loading: false, success:'Membuat akun berhasil, silahkan verifikasi'})
                            setTimeout(() => {
                                this.props.history.push("/login")
                            
                            }, 3000)
                        })

                       
                    }
                    
                })

            }
        })

        


    }

    notification = () => {
        if(this.state.error){
            // notif error, danger
            return (
                <div className='alert alert-danger ml-4 alert-width'>
                    {this.state.error}
                </div>
            )

        } else if(this.state.success){
            // notif success, success
            return (
                <div className='alert alert-success ml-4 alert width'>
                    {this.state.success}
                </div>
            )

        } else {
            return null
        }
    }

    render() {
        return (
            <div>
                <h1 className="ml-4 mb-4 border-bottom shadow-sm logo">
                    Create Account
                </h1>

                
                <Form>
                {this.notification()}

            <FormGroup>
            <div className="col-sm-3">
            <Label className="ml-2 mt-2">Username</Label>
            </div>
            <div className="ml-3">
            <input ref={(input) => {this.username = input}} className="ml-2 form-control-sm width" type="text" name="username" placeholder="Enter your username" />
            </div>
            </FormGroup>
            <FormGroup>
            <div className="col-sm-3">
            <Label className="ml-2">Password</Label>
            </div>
            <div className="ml-3">
            <input ref={(input) => {this.password = input}} className="ml-2 form-control-sm width" type="password" name="password" placeholder="Enter your password" />
            
            </div>

            </FormGroup>
            
            <FormGroup>
            <div className="col-sm-3">
            <Label className="ml-2">Email Adress</Label>
            </div>
            <div className="ml-3">
            <input ref={(input) => {this.email = input}} className="ml-2 form-control-sm width" type="email" name="email" placeholder="Enter your email adress" />
            <button onClick={this.onRegisterClick} className=" ml-2 mt-4 btn align-content-between btn-block font-weight-bold width buttonLogin">
                
                <span className="text-white loginRegister">
                Create Account
                </span>
                </button>
            </div>
            </FormGroup>
            </Form>
            
            </div>
        )
    }

}

export default withRouter(Register) 


