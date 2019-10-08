import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Jumbotron, Container } from 'reactstrap';
import check from "../helpers/images/check.png"

export class ApprovedPremium extends Component {
    render() {
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
               
            </div>
        )
    }
}
                

const mapStateToProps = state => {
    return {
      user_name: state.auth.username,
      role: state.auth.role  
    }
  }

  export default connect(mapStateToProps)(ApprovedPremium)
