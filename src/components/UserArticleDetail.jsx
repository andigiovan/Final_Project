import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Card, CardHeader, CardFooter, CardSubtitle, CardBody,
    CardTitle, CardText, CardImg, Row, Label, Input, Button} from 'reactstrap';
import users from "../helpers/images/userblue.png"
import Swal from 'sweetalert2'
import { Spinner } from 'reactstrap';

export class UserArticleDetail extends Component {

    state = {
        articles: "",
        loading: true
    }

    getUserArticleDetail = () => {
        axios.get(
            `http://localhost:4500/art/userarticledetail/${this.props.match.params.id}`,
            
            ).then((res) => {
               console.log(res.data[0]);
               this.setState({articles: res.data[0],
                              loading: false
                            })
               
                })
            }

 componentDidMount() {
 this.getUserArticleDetail()

}

    render() {
        if (this.state.loading) {
            return(
                <div className="text-center mt-3">
                 <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
                </div>

            )
        }
        else {
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
          <Card className="shadow-none" outline color="secondary">
           <span className="text-center font-weight-bold logo border border-secondary bg-info m-2" style={{fontSize: "18px"}}>{this.state.articles.name}</span>
    <a href={this.state.articles.image_2}>
    <CardImg className="text-center pl-3" style={{width: "270px"}} src={this.state.articles.image_2} />
    </a>
    <CardBody>
      
      <CardText style={{fontSize: "15px"}}>
          <span className="mr-2 font-weight-bold carddetail">Lahir
          
          </span>
          <span className="carddetail">{this.state.articles.born}</span>
          <div>
          <span className="font-weight-bold carddetail">Meninggal</span>
          <span className="ml-2 carddetail">{this.state.articles.dead}</span>
          </div>
          <div>
          <span className="font-weight-bold carddetail">Kewarganegaraan</span>
          <span className="ml-2 carddetail">{this.state.articles.nationality}</span>
          </div>
          <div>
          <span className="font-weight-bold carddetail">Era</span>
          <span className="ml-2 carddetail">{this.state.articles.era}</span>
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
}

const mapStateToProps = (state) => {
    return {
    id : state.auth.id,
    name : state.auth.username,
    role : state.auth.role
    }} 



export default connect(mapStateToProps)(UserArticleDetail)
                       
                
            

