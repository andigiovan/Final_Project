import React, { Component } from 'react'
import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText } from 'reactstrap';
export class LinkVerify extends Component {
    render() {
        return (
            <div>
                <Card className="shadow-sm">
        <CardHeader className="logo" tag="h3">Akun Anda telah terverifikasi!</CardHeader>
        <CardBody>
          
          <CardText>
              Terima Kasih telah memverifikasi email Anda.
          </CardText>
          
        </CardBody>
        
      </Card>
                
            </div>
        )
    }
}

export default LinkVerify

