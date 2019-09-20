import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Card, Button, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, CardImg, Row } from 'reactstrap';
import { connect } from 'react-redux'
import axios from "axios"

class FigureList extends Component {

  state = {
    articles: []
  }

  getData = () => {
    axios.get(
      "http://localhost:1996/article", 


    ).then((res) => {
      console.log(res.data);
      this.setState({articles:res.data})
    })
    
    
  }

  componentDidMount() {
    this.getData()
  }

  renderList = () => {

    let name = this.props.keyword
    let hasilSearch = this.state.articles.filter((article) => {
        return article.name.toLowerCase().includes(name.toLowerCase())
    })
    return hasilSearch.map((article) => {
      return (

        
      <Card className="col-4 mt-4 ">
        <CardImg src={article.image} />
        <CardBody>
          <CardTitle>{article.name}</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
         
        </CardBody>
      </Card>
      

        
      )
    })

  }

    render() {
        return (
            <div>

  <Card className="shadow-none card-list">
        
        
        <h3 className="logo text-center mt-3">Tokoh abad modern</h3>

        
        <Row className="figure-list mt-4 justify-content-center">
         
          {this.renderList()}
        
        </Row>
        
        
      </Card>
            
            </div>
            
            
        
        

       
        

            
            
                
        )
    }
    
}

const mapStateToProps = (state) => {
  return {
    keyword: state.search.keyword
  }
} 

export default connect(mapStateToProps)(FigureList)

