import React, { Component } from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import {connect} from  'react-redux'

import Register from './Register'
import Login from './Login'
import Home from "./Home"
import Header from "./Header"
import FigureDetail from "./FigureDetail"
import FigureEdit from "./FigureEdit"
import FigureList from "./FigureList"
import Premium from "./Premium"


const keepLogin = (objUser) => {
    
    // Action
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: objUser.id,
            username: objUser.username,
            role: objUser.role
        }
    }
}

class App extends Component {

    state = {
        check: false
    }

    componentDidMount() {
        // check local storage
        let userStorage = JSON.parse(localStorage.getItem('userData'))
        
        if(userStorage){
            // kirim ke redux
            this.props.keepLogin(userStorage)
        }

        this.setState({check: true})
    }

    render() {
        return (
            <div>

                <BrowserRouter>
                <Header/>
                <Route path='/' exact component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/figuredetail/:id' component={FigureDetail}/>
                <Route path='/figureedit' component={FigureEdit}/>
                <Route path='/figurelist' component={FigureList}/>
                <Route path='/premium' component={Premium}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null,{keepLogin})(App)
