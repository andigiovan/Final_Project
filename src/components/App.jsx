import React, { Component } from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import {connect} from  'react-redux'
import Cookies from "universal-cookie"

import Register from './Register'
import Login from './Login'
import Home from "./Home"
import Header from "./Header"
import FigureDetail from "./FigureDetail"
import FigureDetailPlus from "./FigureDetailPlus"
import FigureEdit from "./FigureEdit"
import FigureList from "./FigureList"
import Premium from "./Premium"
import PayPage from "./PayPage"
import AdminPage from "./AdminPage"
import ApprovedPremium from "./ApprovedPremium"
import LinkVerify from "./LinkVerify"

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
        const cookies = new Cookies()
        let userStorage = cookies.get('userData')
        
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
                <Route path='/premiumfiguredetail/:id' component={FigureDetailPlus}/>
                <Route path='/figureedit' component={FigureEdit}/>
                <Route path='/figurelist' component={FigureList}/>
                <Route path='/premium' component={Premium}/>
                <Route path='/paypage' component={PayPage}/>
                <Route path='/adminpage' component={AdminPage}/>
                <Route path='/approvedpremium' component={ApprovedPremium}/>
                <Route path='/linkverify' component={LinkVerify}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null,{keepLogin})(App)
