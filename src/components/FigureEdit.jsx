import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Button} from "reactstrap"
import { connect } from 'react-redux'
import Swal from "sweetalert2"
import axios from "axios"




class FigureEdit extends React.Component {
    state = {
        inputContent : "",
        inputName: "",
        inputBorn: "",
        inputDead: "",
        inputImage: "",
        inputImage_2: "",
        inputSubtitle: "",
        inputNationality: "",
        inputEra: ""
        

    }

    postArt = () => {
        axios.post(
            "http://localhost:4500/art/userarticle",
            {
                name: this.state.inputName,
                subtitle: this.state.inputSubtitle,
                content: this.state.inputContent,
                image: this.state.inputImage,
                image_2: this.state.inputImage_2,
                born: this.state.inputBorn,
                dead: this.state.inputDead,
                nationality: this.state.inputNationality,
                era: this.state.inputEra,
                user_id: this.props.id
            }
            )
            .then(() => {
                Swal.fire(
                    'Berhasil!',
                    'Berhasil membuat artikel!',
                    'success'
                  )
            })
    }

    render(){
        return(
            <div className="form-group">
                <input className="mb-3 mt-3 ml-2" ref= "inputname" onChange={e => this.setState({inputName: e.target.value})} style={{width: "300px", height: "40px"}} placeholder="Nama tokoh Anda..." type="textarea" name="text" id="exampleText" />
                <input className="mb-3 mt-3 ml-2" ref= "inputBorn" onChange={e => this.setState({inputBorn: e.target.value})} style={{width: "300px", height: "40px"}} placeholder="Lahir..." type="textarea" name="text" id="exampleText" />
                <input className="mb-3 mt-3 ml-2" ref= "inputDead" onChange={e => this.setState({inputDead: e.target.value})} style={{width: "300px", height: "40px"}} placeholder="Meninggal..." type="textarea" name="text" id="exampleText" />
                <input className="mb-3 ml-2" ref= "inputimage" onChange={e => this.setState({inputImage: e.target.value})} style={{width: "300px", height: "40px"}} placeholder="Link Image Anda..." type="textarea" name="text" id="exampleText" />
                <input className="mb-3 ml-2" ref= "inputimage2" onChange={e => this.setState({inputImage_2: e.target.value})} style={{width: "300px", height: "40px"}} placeholder="Link Image ke-2 Anda..." type="textarea" name="text" id="exampleText" />
                <input className="mb-3 ml-2" ref= "inputsubtitle" onChange={e => this.setState({inputSubtitle: e.target.value})} style={{width: "300px", height: "40px"}} placeholder="Subtitle..." type="textarea" name="text" id="exampleText" />
                <input className="mb-3 ml-2" ref= "inputnationality" onChange={e => this.setState({inputNationality: e.target.value})} style={{width: "300px", height: "40px"}} placeholder="Kewarganegaraan..." type="textarea" name="text" id="exampleText" />
                <input className="mb-3 ml-2" ref= "inputera" onChange={e => this.setState({inputEra: e.target.value})} style={{width: "300px", height: "40px"}} placeholder="Era..." type="textarea" name="text" id="exampleText" />
                
                
                <Editor onChange={e => this.setState({inputContent: e.target.getContent()})} apikey="pdwv90tlz7g3j59cqrddhopppqx2550pqfldjrpmb1f7urm6" />
                <h1>{this.state.inputContent}</h1>
                
                <div  className="d-flex align-items-center justify-content-center mb-2"><Button onClick={this.postArt} color="primary" active>Submit</Button>{' '}</div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
               return {
                 id : state.auth.id,
                }
            } 
                 
                
           
           
export default connect(mapStateToProps)(FigureEdit)
                
                
                