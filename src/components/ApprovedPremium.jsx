import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Jumbotron, Container, ListGroup, ListGroupItem, Card, Button, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, CardImg, CardHeader, CardFooter, Row } from 'reactstrap';
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import check from "../helpers/images/check.png"
import axios from "axios"
import plus from "../helpers/images/plus.png"

export class ApprovedPremium extends Component {

  state = {
    articles: []
  }
    

  getUserArticle = () => {
    console.log(this.props.id);
    
    axios.get(
      "http://localhost:4500/art/getuserarticle", 
      {
        params: {
          user_id : this.props.id
        }
      }
      

    ).then((res) => {
      console.log(res.data);
      this.setState({articles:res.data})
    })
    .catch((err) => {
      console.log(err);
      
    })
    
    
  }

  componentWillMount() {
    console.log(this.props.id)
  }

  componentDidMount() {
    
    console.log('KOCHENGGG');
    
    this.getUserArticle()
  }

  renderUserArticle = () => {
    console.log(this.state.articles);
    
      let list =  this.state.articles.map((article) => {
        return(
        <Link to= {`/userarticledetail/${article.id}`} className="col-4 mt-4" style={{textDecoration: "none", color: "black"}}>
      <Card>
        <CardImg src={article.image} />
        <CardBody>
          <CardTitle className="text-center logo font-weight-bold" style={{fontSize: "20px"}}>{article.name}</CardTitle>
          <CardText>{article.subtitle}</CardText>
          
         
        </CardBody>
      </Card>
      </Link>
      )
      })
      return list
    
  }


    render() {
      if (this.props.role === "premium") {
        return (
          <div>
              <Jumbotron style={{backgroundColor: "rgb(160, 195, 210)"}} fluid>
      <Container fluid>
        <h1 className="display-3 logo text-center">Anda telah berlangganan
        <img className="mb-4 ml-3" style={{width: "50px"}} src={check} alt="Checklist" />
        </h1>
        <p className="lead text-center">Terimakasih telah berlangganan.
        </p>
      </Container>
    </Jumbotron>

    <Card className="card-list shadow-none m-3">
          <CardHeader className="tokoh-header">
            <h3 className="logo text-center mt-1 mb-0 ">Artikel Anda</h3>
            </CardHeader>
            
            
          <Link to="/figureedit">
            <div className="text-center mt-2">
            <img style={{width: "30px"}} src={plus}/>
            <span>
              Tambahkan Artikel
              </span>
            </div>
          </Link>
          
        <Row className="figure-list mt-4 justify-content-center">
        
            
          {this.renderUserArticle()}
        
        </Row>
        </Card>
             
          </div>
      )
      }
      else {
        return <Redirect to="/"/>
      }
        
    }
}
                

const mapStateToProps = state => {
    return {
      id: state.auth.id,
      user_name: state.auth.username,
      role: state.auth.role  
    }
  }

  export default connect(mapStateToProps)(ApprovedPremium)
            
              
            
              
         
          
