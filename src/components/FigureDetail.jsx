import React, { Component } from 'react'
import axios from 'axios'
import { Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText } from 'reactstrap';

class FigureDetail extends Component {

    state = {
        articles: ""
    }

    componentDidMount() {
        axios.get(
            `http://localhost:1996/article/${this.props.match.params.id}`,
            


        ).then((res) => {
           
            this.setState({articles: res.data})
            
        })
    }

    render() {
        return (
            <div>
                <Card>
        <CardHeader>{this.state.articles.name}</CardHeader>
        <CardBody>
          <CardTitle></CardTitle>
          <CardText>{this.state.articles.content}</CardText>
          
        </CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
            
            </div>
            
        )
    }



}

export default FigureDetail