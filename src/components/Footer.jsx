import React, { Component } from 'react'
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody
  } from 'reactstrap';
  import facebook from "../helpers/images/facebook.png"
  import twitter from "../helpers/images/twitter.png"
  import instagram from "../helpers/images/instagram.png"
  import {Link} from 'react-router-dom'


export class Footer extends Component {
    render() {
        return (
            <div>
                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
               
                <div className="navbar-brand logo" style={{marginLeft: "70px"}}>
                  <div>
                  <h2 className="pb-0">
                  <img className="image mb-4 ml-4" src="https://conferencephilosophyoflaw.files.wordpress.com/2012/12/logo_szare_duze2.png" alt=""/>
                    <span className="ml-2">
                     ParaTokoH
                    <div className="border border-bottom border-light">
                    </div>
                    </span> 
                    </h2>
                  </div>

                    
                  
                  
              </div>

              

              <div  className="row">
                <CardText className="col-4 text-justify ml-3">
                <div className="text-center">
                2019 © Paratokoh 
                </div>
                <div className="text-center">
                All Right Reserved.
                </div>
                <div>
                <span style={{marginLeft: "65px"}}>
                <a className="text-white" href="">Kebijakan Privasi</a>
                </span>
                <span className="ml-3">
                <a className="text-white" href="">Syarat dan Ketentuan</a>
                </span>
                </div>
                
                </CardText>
               
                
                <CardText className="col-4 text-justify font-weight-bold">
                
                <a className="text-white text-center d-block" href="/" rel="nofollow norefferer">About Me</a>
                <a className="text-white text-center d-block" href="/" rel="nofollow norefferer">Contact Me</a>
                <a className="text-white text-center d-block" href="/" rel="nofollow norefferer">Terms & Conditions</a>
                <a className="text-white text-center d-block" href="/" rel="nofollow norefferer">Privacy Policy</a>
                <a className="text-white text-center d-block" href="/" rel="nofollow norefferer">FAQ</a>
                
               
                </CardText>

                <CardText className="col-3">
                <div className="text-center font-weight-bold">
                  Komunitas
                </div>
                <div className="text-center mt-4">
                  <img style={{width: "30px"}} src={facebook} alt="facebook"/>
                  <img className="ml-2" style={{width: "30px"}} src={twitter} alt="twitter"/>
                  <img style={{width: "50px"}} src={instagram} alt="instagram"/>
                </div>
                </CardText>
                
              </div>
                
                </Card>
            </div>
        )
    }
}

                
                


                  
                  
                  
          
                            
                        
                

export default Footer
