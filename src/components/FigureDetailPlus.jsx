import React, { Component } from 'react'
import axios from 'axios'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Card, CardHeader, CardFooter, CardImg, CardBody,
    CardTitle, CardText, Row } from 'reactstrap';
import { connect } from 'react-redux'
import users from "../helpers/images/userblue.png"
import Swal from 'sweetalert2'

class FigureDetailPlus extends Component {

    state = {
        articles: ""
        
            
    }

    getArticle = () => {
        axios.get(
            `http://localhost:4500/art/premiumfiguredetail/${this.props.match.params.id}`,
            
           
            

        ).then((res) => {
           console.log(res.data[0]);
           this.setState({articles: res.data[0]})
           
            
        })
    }
    
    componentDidMount() {
        this.getArticle()
    }

    // this.state.articles[0].imagedetail
    
    render() {
        
            return (
                <div>
                    
                    <Card className="shadow-none">
            <CardHeader style={{backgroundColor: "white", fontSize: "30px"}} className="font-weight-bold logo">{this.state.articles.name}</CardHeader>
            <CardBody>
              <CardTitle></CardTitle>
              <Row> 
                <div className="col-9">
              <CardText>{ ReactHtmlParser(this.state.articles.content) }</CardText>
              </div>
              <div className="col-3">
              <Card className="shadow-none">
               <span className="text-center font-weight-bold logo">{this.state.articles.name}</span>
        <a href={this.state.articles.imagedetail}>
        <CardImg className="text-center pl-4 pt-2" style={{width: "270px"}} src={this.state.articles.imagedetail} />
        </a>
        <CardBody>
          
          <CardText>
              <span className="mr-2 font-weight-bold logo">Lahir
              
              </span>
              <span className="logo">{this.state.articles.born}</span>
              <div>
              <span className="font-weight-bold logo">Meninggal</span>
              <span className="ml-2 logo">{this.state.articles.dead}</span>
              </div>
              <div>
              <span className="font-weight-bold logo">Kewarganegaraan</span>
              <span className="ml-2 logo">{this.state.articles.nationality}</span>
              </div>
              <div>
              <span className="font-weight-bold logo">Era</span>
              <span className="ml-2 logo">{this.state.articles.era}</span>
              </div>
              
          </CardText>
        </CardBody>
      </Card>
              </div>
              </Row>
            </CardBody>
          </Card>
          </div>
            )
        
    }



}

const mapStateToProps = (state) => {
    return {
      id : state.auth.id,
      name : state.auth.username,
      role : state.auth.role
    }
} 
     
export default connect(mapStateToProps)(FigureDetailPlus)


