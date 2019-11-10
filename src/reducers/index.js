import {combineReducers} from 'redux'


const init = {
    id: "",
    username: "",
    role: "",
    cookieChecker: false
}

const initSearch = {
    keyword: ""
}

const AuthReducer = (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            // Akan menyalin property di state untuk kemudian di ubah 'id' dan 'username'
            return {...state,id: action.payload.id, username: action.payload.username, role: action.payload.role, cookieChecker: true }

            // Hilangkan id dan username
        case 'LOGOUT_SUCCESS':
            return {...state,id: "", username: "", role: "", cookieChecker: true }
        
        case 'SUBSCRIBE_SUCCESS':
            return {...state,role: action.payload.role, cookieChecker: true}

        default:
            return state
    }
}

const searchReducer = (state = initSearch, action) => {
    switch(action.type) {
        case "SEARCH_SUCCESS":
            return {...state, keyword: action.payload.keyword, cookieChecker: true}
        default:
            return state
    }
}

const reducers = combineReducers(
    {
        auth: AuthReducer,
        search: searchReducer
    }
)

export default reducers