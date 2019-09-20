import React, { Component } from 'react'
import { Card, CardImg, CardHeader, Button, CardTitle, CardText, Row, Col, CardBody, CardFooter } from 'reactstrap';
import {Link, NavLink} from 'react-router-dom'
import { Jumbotron, Container } from 'reactstrap';
import axios from 'axios'



class Home extends Component {
  
  state = {
      articles: []
      
  }
  

  getData = () => {
    axios.get(
      "http://localhost:4000/art/article", 


    ).then((res) => {
      console.log(res.data);
      this.setState({articles:res.data})
    })
    
    
  }
  componentDidMount() {
    this.getData()
  }

  renderList = () => {

    let rendering = this.state.articles.map((article) => {
            
            return (

            
      <Col key={article.id} sm="6">
            
        
        <Link to={`/figuredetail/${article.id}`} className="link"> 
        <Card body className="ml-3 mr-3 mb-3">
        
            
          <h5 className=" border border-info border-dark text-left bg-info pt-2 pl-1 card">
          <CardTitle>{article.name}</CardTitle>
          </h5>
          <CardImg className="w-75 container" src={article.image}/>
          
          
        </Card>
        </Link>
        
      </Col>
      
      
            
            )

           
    })

    return rendering
  }

    render() {
        return (
            <div>
              <Card className="card-utama align-items-center">

              <Card className="m-4 mb-2 shadow-none welcome p-2 align-items-center container" body>
        <CardTitle>
        <h3 className="display-4">Selamat Datang!</h3>
        </CardTitle>
        <CardText>
        <p className="lead">Jika anda menyukai pemikiran abad modern, 
          ini adalah website yang tepat.</p>
        </CardText>
        
             </Card>
        
        <CardBody className="container">
          
          <Jumbotron className="bg-info text-black logo w-100 m-1 mt-1 des border-tron center" fluid>
        <Container fluid>
           <div className="row">
             <div className="col-6"> 
          <h1 className="display-3 font-italic paratokoh">ParaTokoH</h1>
          <p className="lead text-justify font-weight-bold">ParaTokoh merupakan sebuah website khusus yang merangkum pemikiran-pemikiran para tokoh yang berpengaruh dalam pembentukan dunia modern. Pemikiran-pemikiran modern atau bisa juga disebut filsafat modern adalah pembagian dalam sejarah Filsafat Barat yang menjadi tanda berakhirnya era skolastisisme. Waktu munculnya filsafat modern adalah abad ke-17 hingga awal abad ke-20 di Eropa Barat dan Amerika Utara. Filsafat Modern ini pun dimulai sejak munculnya rasionalisme lewat pemikiran Descartes, seorang filsuf terkemuka pada zaman Modern.
          
          </p>
          </div>
          </div>
          <Link className="font-weight-bold lead text-primary">
            Lanjutkan Membaca...
          </Link>
        </Container>
      </Jumbotron>

      <div className="text-center w-100 mt-3 m-1 video">

      <Card className="video container shadow-none" body inverse color="info">
        <CardTitle>
          <h2 className="logo font-weight-bold"> Apa itu filsafat?</h2>
         
        </CardTitle>
        <CardText>
        <iframe width="1000" height="515" src="https://www.youtube.com/embed/oWnwhCDzv7E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </CardText>
        
      </Card>

      
      </div>
               <h5 className="container text-center mb-4 mt-4 logo font-weight-bolder size">
                <CardHeader>
                    
                    Para Tokoh yang Membentuk Dunia Modern

                </CardHeader>

                
                </h5>  
                <Row>
                {this.renderList()}
                </Row>
                <Link to="./figurelist">
                <div className="d-flex justify-content-center">
                <Button color="info">View More</Button>{' '}
                </div>
                </Link>
                
        </CardBody>
        <CardFooter>Teks tersedia di bawah Lisensi Atribusi-BerbagiSerupa Creative Commons; ketentuan tambahan mungkin berlaku. Lihat Ketentuan Penggunaan untuk lebih jelasnya.</CardFooter>
      </Card>

          </div>
  )
}
          
          
}  
        
    



export default Home