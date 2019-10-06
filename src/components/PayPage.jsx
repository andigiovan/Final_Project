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
          <div className="logo font-weight-bold ml-2" style={{fontSize: "20px"}}>
          Transfer Bank
          </div>
          
          
          </CardHeader>
        
        <CardBody>
        <div className="row">
          <CardText className="ml-4">
          <h5 className="font-weight-normal mb-4 ml-1">Bank Tujuan</h5>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="ml-1" caret>
          Pilih Bank
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem >Bank Bca</DropdownItem>
          <DropdownItem>Bank Mandiri</DropdownItem>
          
          
        </DropdownMenu>
      </Dropdown>
      
          </CardText>
          
          
          
          
          <Card className="col-4 ml-auto mr-5 shadow-none">
        <CardHeader>Ringkasan Pembayaran</CardHeader>
        <CardBody>
          
          <CardText>
            <div className="row">
              <div>
              Total Transaksi
              </div>
            
            </div>
            

          </CardText>
          

        </CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
      
          </div>
          <div className="col-3">
          <Label>
          <input type="text" className="form-control mb-3" onChange={e => this.setState({subsName: e.target.value})}/>  
          </Label>
          
          </div>
          <span className="mt-0 ml-3">
          <Button onClick={() => this.refs.fileBtn.click()} className="mr-3">Upload bukti pembayaran</Button>
          <Button onClick={this.onSubmit}>Submit</Button>
          <input type="file" ref="fileBtn" className="d-none" onChange={e => this.setState({selectedFile: e.target.files[0]})} />
          </span>
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