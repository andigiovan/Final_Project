import {combineReducers} from 'redux'


const init = {
    id: '',
    username: ''
}

const AuthReducer = (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            // Akan menyalin property di state untuk kemudian di ubah 'id' dan 'username'
            return {...state,id: action.payload.id, username: action.payload.username }

            // Hilangkan id dan username
        case 'LOGOUT_SUCCESS':
            return {...state,id: '', username: '' }

        default:
            return state
    }
}

const reducers = combineReducers(
    {
        auth: AuthReducer
    }
)

export default reducers