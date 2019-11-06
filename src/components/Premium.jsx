import React, { Component } from 'react'
import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Jumbotron, Container, Row, Col } from 'reactstrap';
import axios from "axios"
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import bca from "../helpers/images/bca.jpg"
import mandiri from "../helpers/images/mandiri.jpg"
import telkomsel from "../helpers/images/telkomsel.jpg"
import xl from "../helpers/images/xl.png"

  


class Premium extends Component {

 
  

    render() {
        return (
            <div>
                <Card className="shadow-none">
        
        <CardBody>
          <CardTitle>
          <Jumbotron className="premium" fluid>
        <Container fluid>
          <h1 className="display-3 logo">
              Dapatkan akses konten premium dengan cara berlangganan.
          </h1>
          <p className="lead font-weight-bold">Hanya Rp. 10.000 anda dapat mengakses konten premium kami seumur hidup.</p>
          
        </Container>
      </Jumbotron>
          </CardTitle>
          <CardText>
          <Row>
      <Col sm="6">
        <Card body className="shadow-sm">
          <CardHeader className="text-center font-weight-bold bg-transparent">Pembayaran via pulsa</CardHeader>
          <CardText className="carddetail">
          Anda dapat mengakses konten premium milik kami, dan dengan berlangganan pula, 100% dari total pembayaran akan kami sumbangkan ke yayasan yatim piatu.
          <div>
          <img style={{width: "60px" }} src={telkomsel}/>
          <img style={{width: "45px" }} src={xl}/>
          </div>
          </CardText>
          <Button className="btn-block" color="primary">Dapatkan Premium</Button>{' '}
        </Card>
      </Col>
      <Col sm="6">
        <Card body className="shadow-sm">
          <CardHeader className="text-center font-weight-bold bg-transparent">Pembayaran via bank</CardHeader>
          <CardText className="carddetail">
            Anda dapat mengakses konten premium milik kami, dan dengan berlangganan pula, 100% dari total pembayaran akan kami sumbangkan ke yayasan yatim piatu.
          <div>
          <img style={{width: "60px" }} src={bca}/>
          <img style={{width: "50px" }} src={mandiri}/>
          </div>
          
          </CardText>
          <Link style
          ={{textDecoration: "none"}} to="./paypage">
          <Button className="btn-block" color="primary" >Dapatkan Premium</Button>{' '}
          </Link>
          
        </Card>
      </Col>
    </Row>
          </CardText>
          
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
            </div>
        )
    }
}

const mapStateTProps = state => {
  return {
    id: state.auth.id,
     
  }
}





export default connect(mapStateTProps)(Premium)