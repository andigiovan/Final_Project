import React, { Component } from 'react'
import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Jumbotron, Container, Row, Col } from 'reactstrap';
import axios from "axios"
import {connect} from 'react-redux'
  


class Premium extends Component {

  onPremium = () => {
  axios.patch(
    "http://localhost:4000/auth/updaterole",  
    
    {
      id: this.props.id
  }
  )
  }
  

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
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
          <Button outline color="primary">Berlangganan</Button>{' '}
        </Container>
      </Jumbotron>
          </CardTitle>
          <CardText>
          <Row>
      <Col sm="6">
        <Card body>
          <CardHeader className="text-center font-weight-bold">Pembayaran via pulsa</CardHeader>
          <CardText>
          Anda dapat mengakses konten premium milik kami, dan dengan berlangganan pula, 5% dari total pembayaran akan kami sumbangkan ke yayasan yatim piatu.
          </CardText>
          <Button color="primary">Berlangganan</Button>{' '}
        </Card>
      </Col>
      <Col sm="6">
        <Card body>
          <CardHeader className="text-center font-weight-bold">Pembayaran via bank</CardHeader>
          <CardText>
            Anda dapat mengakses konten premium milik kami, dan dengan berlangganan pula, 5% dari total pembayaran akan kami sumbangkan ke yayasan yatim piatu.
          </CardText>
          <Button onClick={this.onPremium} color="primary">Berlangganan</Button>{' '}
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