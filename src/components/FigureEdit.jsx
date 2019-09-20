import React from 'react'
import {Editor} from '@tinymce/tinymce-react'


class Testing extends React.Component {
    state = {
        input : ''
    }

    render(){
        return(
            <div>
                <Editor onChange={e => this.setState({input: e.target.getContent()})} apikey="pdwv90tlz7g3j59cqrddhopppqx2550pqfldjrpmb1f7urm6" />
                <h1>{this.state.input}</h1>
            </div>
        )
    }
}

export default Testing