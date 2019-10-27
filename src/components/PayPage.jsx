import React, { Component } from 'react'
import { Card, Label, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from "axios"
import Swal from 'sweetalert2'
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
        subsName: '',
        bank: ""
        
        
      }

      onSubmit = () => {
        var fd =new FormData
        fd.append('browse_file', this.state.selectedFile, this.state.selectedFile.name)
        fd.append('subs_name', this.state.subsName)
        fd.append("id_user", this.props.id)
      
        axios.post(
          URL_API + "uploadimage", fd
        ).then(res => {
          console.log(res);
          Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )
          
        }).catch(err => {
          console.log(err);
          
        })
      }

      

    render() {
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
                    <select className="form-control ">
                      <option >Bank Bca</option>
                      <option>Bank Mandiri</option>
                    </select>
                  </div>
                  <div>
                    Nama Rekening
                    <input type="text" className="form-control mb-3" onChange={e => this.setState({subsName: e.target.value})}/>  
                  </div>
                  <div>
                    <Button onClick={() => this.refs.fileBtn.click()} className="mr-3">Upload bukti pembayaran</Button>
                    <Button onClick={this.onSubmit}>Submit</Button>
                    <input type="file" ref="fileBtn" className="d-none" onChange={e => this.setState({selectedFile: e.target.files[0]})} />
                  </div>
                </div>

                <div className="col-4 offset-4">
                  <Card className="shadow-none">
                    <CardHeader>Ringkasan Pembayaran</CardHeader>
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
                    <CardFooter className="row">
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

}

const mapStateToProps = state => {
  return {
    id: state.auth.id,
     
  }
}

export default connect(mapStateToProps)(PayPage)