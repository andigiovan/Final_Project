import React, { Component } from 'react'
import axios from 'axios'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Row } from 'reactstrap';

class FigureDetail extends Component {

    state = {
        articles: ""
        
            
    }
    
    componentDidMount() {
        
        axios.get(
            `http://localhost:4000/art/figuredetail/${this.props.match.params.id}`,
           
            

        ).then((res) => {
           console.log(res.data[0]);
           
            this.setState({articles: res.data[0]})
            
        })
    }

    // this.state.articles[0].imagedetail
    
    render() {
        return (
            <div>
                <Card className="shadow-none">
        <CardHeader></CardHeader>
        <CardBody>
          <CardTitle></CardTitle>
          <Row> 
            <div className="col-9">
          <CardText>{ ReactHtmlParser(this.state.articles.content) }
  
          </CardText>
          </div>
          <div className="col-3">
          <img className="w-100" src={this.state.articles.imagedetail} />
         
          </div>
          </Row>
          
        </CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
            
            </div>
            
        )
    }



}

export default FigureDetail