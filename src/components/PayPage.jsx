import React, { Component } from 'react'
import { Card, Button, CardHeader, CardFooter, CardBody,
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
        <CardHeader>Transfer Bank</CardHeader>
        <CardBody>
          
          <CardText>
          <h5 className="font-weight-normal mb-4">Bank Tujuan</h5>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Pilih Bank
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Bank Bca</DropdownItem>
          <DropdownItem>Bank Mandiri</DropdownItem>
          
          
        </DropdownMenu>
      </Dropdown>
          </CardText>
          <div className="col-3">
          <input type="text" className="form-control mb-3 ml-0" onChange={e => this.setState({subsName: e.target.value})}/>
          </div>
          
          <span>
          <input type="file" ref="fileBtn" className="d-none" onChange={e => this.setState({selectedFile: e.target.files[0]})} />
          <Button onClick={() => this.refs.fileBtn.click()} className="mr-3">Upload bukti pembayaran</Button>
          <Button onClick={this.onSubmit}>Submit</Button>
          
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