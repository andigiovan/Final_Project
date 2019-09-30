import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Button} from "reactstrap"
import axios from "axios"


class Testing extends React.Component {
    state = {
        input : ''
    }

    postArt = () => {
        axios.post(
            "http://localhost:4000/art/articledetail",
            {
                content: this.state.input
            }
            )
    }

    render(){
        return(
            <div>
                <Editor onChange={e => this.setState({input: e.target.getContent()})} apikey="pdwv90tlz7g3j59cqrddhopppqx2550pqfldjrpmb1f7urm6" />
                <h1>{this.state.input}</h1>
                <div  className="d-flex align-items-center justify-content-center"><Button onClick={this.postArt} color="primary">Post</Button>{' '}</div>
                
            </div>
        )
    }
}

export default Testing