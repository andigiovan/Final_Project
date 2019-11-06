import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie' 
import {withRouter} from 'react-router-dom'

    


export const onLoginUser = (USERNAME, PASSWORD) => {
    

    return (dispatch) => {

        axios.get(
            "http://localhost:4500/auth/login",
            {
                params: {
                    username: USERNAME,
                    password: PASSWORD
                }
            }
        ).then(res => {
            if (res.data.length === 0) {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'User tidak ditemukan',
                    footer: '<p>Silahkan coba lagi</p>'
                  })
                
            }
            else if(res.data[0].isVerified === 0) {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Akun Anda belum terverifikasi',
                    footer: '<p>Silahkan coba lagi</p>'
                  })
            }
            else {
                let {id, username, role} = res.data[0]
                const cookies = new Cookies()
                cookies.set(
                    "userData", 
                     {id, username, role}

                )
                dispatch(
                    {
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            id, username, role
                        }
                    }
                )
                
                
                
            }
        })
        
    }


}

export const onLogoutUser = () => {
    const cookies = new Cookies
    cookies.remove("userData")

    return {
        type: "LOGOUT_SUCCESS"
    }
}

export const searchKeyword = (keyword) => {

    return {
        type: "SEARCH_SUCCESS",
        payload: {
            keyword: keyword
        }
    }

}





