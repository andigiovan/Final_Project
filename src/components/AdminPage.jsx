import React, { Component } from 'react'
import axios from "axios"
import { Button } from 'reactstrap';
import Swal from "sweetalert2"
import ModalImage from "react-modal-image";


const URL_API = 'http://localhost:4500/'

export class AdminPage extends Component {

    state = {
        subscribe:[]
    }

    

    getData= () => {
        axios.get(
            URL_API + "getdata"
        ).then(res => {
            console.log(res.data);
            
            this.setState({subscribe:res.data})
        }).catch(err => {
           console.log(err);
            
        })
    }

    onApprove = (id) => {
        axios.patch(
            "http://localhost:4500/auth/updaterole", 
            {
                id : id
                
            } 
            
            
          )
          axios.patch(
            "http://localhost:4500/completeapprove", 
            {
                id : id,
                 
                
            } 
          )
          .then(
            this.getData,
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
              )
          )
          
    }

    approveButton = (id, isApproved) => {
        if (isApproved) {
            return(
            <Button disabled outline color="success">success</Button>
            )
       
        }
        else {
            return(
            <Button onClick={() => {this.onApprove(id)}} outline color="success">success</Button>
            )
        }
    }

    componentDidMount() {
        this.getData()
    }

    renderApproval = () => {

        return this.state.subscribe.map((val) => {
            return (
                <tr>
                    <td>{val.id}</td>
                    <td>{val.subs_name}</td>
                    <td><a href={URL_API + 'files/' + val.subs_image} target="_blank">
                    <img src={URL_API + 'files/' + val.subs_image} width="100" alt={val.id}/></a></td>
                    <td>{val.id_user}</td>
                    <td>{val.isApproved ? 'Selesai' : 'Belum selesai'}</td>
                    <td>{this.approveButton(val.id_user, val.isApproved)}</td>
                    
                    
                </tr>
            )    
        

        })

    }
    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <h3 className="mb-4">Approval</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Deskripsi</th>
                                <th>Bukti Transfer</th>
                                <th>ID_User</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderApproval()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}



export default AdminPage
