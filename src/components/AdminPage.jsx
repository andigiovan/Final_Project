import React, { Component } from 'react'
import axios from "axios"
import { Button } from 'reactstrap';
import Swal from "sweetalert2"
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


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
                'Berhasil',
                'Bukti transfer telah dikonfirmasi',
                'success'
              )
          )
          
    }

    deleteButton = (id) => {
        Swal.fire({
          title: 'Apa Anda yakin?',
          text: "Bukti transfer ini akan terhapus!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, hapus!'
        }).then((result) => {
          if (result.value) {
            axios.delete(
                    "http://localhost:4500/deletesubs", 
                    {
                        params: {
                            id : id
                        }
                        
                    } 
                    ).then(() => {
                      Swal.fire(
                      'Terhapus!',
                      'Bukti transfer telah terhapus.',
                      'success'
                      )
                        this.getData()
                    })
            }
          })
          }
                    
                       
                    
        

    approveButton = (id, isApproved) => {
        if (isApproved) {
            return(
            <Button disabled outline color="success">Konfirmasi</Button>
            )
       
        }
        else {
            return(
            <Button onClick={() => {this.onApprove(id)}} outline color="success">Konfirmasi</Button>
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
                    <td><Button onClick={() => this.deleteButton(val.id)} outline color="danger">Delete</Button></td>
                    
                    
                    
                </tr>
            )    
        

        })

    }
    render() {
        if (this.props.role === "admin") {
            return (
                <div className="container">
                    <div className="row mt-5">
                        <h3 className="mb-4 text-center">Bukti Transfer Pembeli</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Deskripsi</th>
                                    <th>Bukti Transfer</th>
                                    <th>ID_User</th>
                                    <th>Status</th>
                                    <th>Konfirmasi</th>
                                    <th>Hapus Bukti</th>
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
        else {
            return <Redirect to="/"/>
        }
        
    }
}

const mapStateToProps = state => {
    return {
        role: state.auth.role  
    }
}
      



export default connect(mapStateToProps)(AdminPage)
