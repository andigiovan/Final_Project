import React, { Component } from 'react'
import { Card, Label, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from "axios"
import Swal from 'sweetalert2'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'


const URL_API = 'http://localhost:4500/'

class PayPage extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

      state = {
        selectedFile: null,
        subscribe: [],
        subsName: undefined,
        bank: "",
        value: "Transfer ke Bank BCA: 5271414910 a.n. Andi M Giovan",
        file: null,
        fileName: ""

        
        
        }

        onSubmit = () => {
          if (this.state.subsName === undefined) {
            Swal.fire(
            'Oops',
            'Nama rekening tidak boleh kosong',
            'error'
            )
          }
          else if (!this.state.selectedFile) {
            Swal.fire(
              'Oops',
              'Bukti belum Anda upload',
              'error'
              )
          }
        else {
        var fd =new FormData
        fd.append('browse_file', this.state.selectedFile, this.state.selectedFile.name)
        fd.append('subs_name', this.state.subsName)
        fd.append("id_user", this.props.id)
      
        axios.post(
          URL_API + "uploadimage", fd
        ).then(res => {
          console.log(res);
          Swal.fire(
            'Berhasil',
            'Bukti transfer akan di-cek oleh admin kami 1x24 jam',
            'success'
          )
          
        }).catch(err => {
          console.log(err);
          
        })
      }
    }

      onChange = (e) => {
        this.setState({value: e.target.value})
      }

      show=(e)=>{
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
            selectedFile:e.target.files[0],
            fileName: e.target.files[0].name

        })
      }

     
      render() {
      if (this.props.name) {
        console.log(this.state.selectedFile);
        
        return (
          <div>
            <Card className="shadow-none">
              <CardHeader >
                <div className="logo font-weight-bold col-12" style={{fontSize: "20px"}}>
                Transfer Bank
                </div>
              </CardHeader>

              <CardBody className="row">
                <div className="col-4">
                  <div className="mb-2">
                   Bank Tujuan
                    <select onChange={this.onChange} value={this.state.value} className="form-control ">
                      <option value="Transfer ke Bank BCA: 5271414910 a.n. Andi M Giovan" >
                        Bank Bca
                        </option>
                      <option value="Transfer ke Bank MANDIRI: 5271426577 a.n. Giovan">Bank Mandiri</option>
                    </select>
                  </div>
                  <div>
                  <p>{this.state.value}</p>
                    Nama Rekening Anda
                    <input type="text" className="form-control mb-3" onChange={e => this.setState({subsName: e.target.value})}/>  
                  </div>
                  <div>
                    <Button color="primary" active onClick={() => this.refs.fileBtn.click()} className="mr-3">Upload bukti pembayaran</Button>
                    <Button color="primary" active onClick={this.onSubmit}>Submit</Button>
                    <img className="w-25 mt-3" src={this.state.file} alt=""/>
                    <div>{this.state.fileName}</div>
                    <input type="file" ref="fileBtn" className="d-none" onChange={e => this.show(e)}/>
                  </div>
                </div>

                <div className="col-4 offset-4">
                  <Card className="shadow-none">
                    <CardHeader className="bg-transparent">Ringkasan Pembayaran</CardHeader>
                    <CardBody>
                      <CardText className="row">
                        <div className="ml-3">Total Transaksi</div>
                        <div className="ml-auto mr-3">Rp 10.000</div>
                      </CardText>
                      <CardText className="row">
                        <div className="ml-3">Biaya Layanan</div>
                        <div className="ml-auto mr-3">Gratis</div>
                      </CardText>
                    </CardBody>
                    <CardFooter className="row bg-transparent">
                      <div className="ml-3">Total Tagihan</div>
                      <div className="mr-3 ml-auto">Rp 10.000</div>
                    </CardFooter>
                  </Card>
                </div>

              </CardBody>
            </Card>
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
    id: state.auth.id,
    name: state.auth.username
     
  }
}

export default connect(mapStateToProps)(PayPage)