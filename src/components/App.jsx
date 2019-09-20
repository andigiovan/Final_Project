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


const keepLogin = (objUser) => {
    
    // Action
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: objUser.id,
            username: objUser.username
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
                <Route path='/login' exact component={Login}/>
                <Route path='/register' exact component={Register}/>
                <Route path='/figuredetail/:id' exact component={FigureDetail}/>
                <Route path='/figureedit' exact component={FigureEdit}/>
                <Route path='/figurelist' exact component={FigureList}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null,{keepLogin})(App)
