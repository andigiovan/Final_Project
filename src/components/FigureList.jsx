import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Card, Button, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, CardImg, CardHeader, CardFooter, Row,} from 'reactstrap';
  import {Link, NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from "axios"
import Swal from 'sweetalert2'

class FigureList extends Component {

  state = {
    articles: [],
    articles_2: []
  }

  getData = () => {
    axios.get(
      "http://localhost:4500/art/figurelist", 


    ).then((res) => {
      console.log(res.data);
      this.setState({articles:res.data})
    })
    
    
  }

  getList = () => {
    axios.get(
      "http://localhost:4500/art/premiumlist", 


    ).then((res) => {
      console.log(res.data);
      this.setState({articles_2:res.data})
    })
  }

  componentDidMount() {
    this.getData()
    this.getList()
  }

  swalAlert = () => {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Anda belum berlangganan',
      footer: '<a href=/premium>klik disini untuk berlangganan</a>'
    })
  }

  renderList = () => {

    let name = this.props.keyword
    let hasilSearch = this.state.articles.filter((article) => {
        return article.name.toLowerCase().includes(name.toLowerCase())
    })
    return hasilSearch.map((article) => {
      return (

        <Link to={`/figuredetail/${article.id}`} className="link col-4 mt-4">
      <Card>
        <CardImg src={article.image} />
        <CardBody>
          <CardTitle>{article.name}</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
         
        </CardBody>
      </Card>
      </Link>
      

      

        
      )
    })

  }

  renderPremium = () => {

    let name = this.props.keyword
    let hasilSearch = this.state.articles_2.filter((article) => {
        return article.name.toLowerCase().includes(name.toLowerCase())
    })
    return hasilSearch.map((article) => {
      if (this.props.role === "premium") {
        return (

          <Link to={`/premiumfiguredetail/${article.id}`} className="link col-4 mt-4">
        <Card>
          <CardImg src={article.image} />
          <CardBody>
            <CardTitle>{article.name}</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
           
          </CardBody>
        </Card>
        </Link>
          
  
          
          
        
        
  
        
  
          
          )
        }
      else {
        return(
          <Link onClick={this.swalAlert} className="link col-4 mt-4">
        <Card>
          <CardImg src={article.image} />
          <CardBody>
            <CardTitle>{article.name}</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
           
          </CardBody>
        </Card>
        </Link>
        
        )
      }
      
    })

  }

    render() {
        return (
            <div>

  <Card className="shadow-none">
        
        
        

        <Card className="card-list shadow-none m-3">
          <CardHeader className="tokoh-header">
            <h3 className="logo text-center mt-1 mb-0 ">Tokoh abad modern</h3>
            </CardHeader>
        <Row className="figure-list mt-4 justify-content-center">
         
          {this.renderList()}
        
        </Row>
        </Card>

        <Card className="card-list shadow-none m-3">
          <CardHeader className="tokoh-klasik">
          <h3 className="logo text-center mt-1 mb-0 pt-2">Tokoh musik abad klasik</h3>
          </CardHeader>

          <Row className="figure-list mt-4 justify-content-center">
         
         {this.renderPremium()}
       
       </Row>

          </Card>
        

         

          
          <Card className="m-3 shadow-none">
        <CardHeader className="text-center quotes-header logo font-weight-bold"><h4 className="mt-1 mb-0">TokohQuoteS</h4></CardHeader>
        <CardBody>
        <div className="container quotes-body">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet neque hic, incidunt mollitia. Eius autem, asperiores velit, quaerat blanditiis ratione.</p>
  <blockquote cite="John Locke">I have always thought the actions of men the best interpreters of their thoughts.</blockquote>
  <blockquote cite="Rene Descartes">Cogito ergo sum. (I think; therefore I am.)</blockquote>
  <blockquote cite="Friedrich Nietzsche">It is not a lack of love, but a lack of friendship that makes unhappy marriages.</blockquote>
  <blockquote cite="Niccolo Machiavelli">The first method for estimating the intelligence of a ruler is to look at the men he has around him.</blockquote>
  <blockquote cite="Jean-Jacques Rousseau">What wisdom can you find that is greater than kindness?</blockquote>
  
  
</div>

        </CardBody>
     
        
      </Card>
          
        
        

        


        
        
      </Card>
            
            </div>
            
            
        
        

       
        

            
            
                
        )
    }
    
}

const mapStateToProps = (state) => {
  return {
    keyword: state.search.keyword,
    role: state.auth.role
  }
} 

export default connect(mapStateToProps)(FigureList)

