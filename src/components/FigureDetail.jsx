import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Row, Label, Input, Button } from 'reactstrap';
import users from "../helpers/images/users.png"

class FigureDetail extends Component {

    state = {
        articles: "",
        comments: [],
        inputComment: []

            
    }

    getArticle = () => {
        axios.get(
            `http://localhost:4500/art/figuredetail/${this.props.match.params.id}`,
            
           
            

        ).then((res) => {
           console.log(res.data[0]);
           this.setState({articles: res.data[0]})
           
            
        })
    }

    getComment = () => {
        axios.get(
            `http://localhost:4500/comment/getcomment`,{
                params:{
                    articleid: this.props.match.params.id
                }
                
            }
        ).then((res) => {
          this.setState({comments: res.data})
  
          
        })
    }

    
    onSubmitComment = () => {

        let inputComment = this.state.inputComment

        axios.post(
            `http://localhost:4500/comment/addcomment`,
            {
                username: this.props.name,
                comment: inputComment,
                articleid:  this.props.match.params.id
            }

         
        ).then((res) => {
            this.getComment()
        })
    }
    
    componentDidMount() {
        this.getArticle()
        this.getComment()
        
    }

    renderComment = () => {

        return this.state.comments.map((val) => {
            return (
                
                <Card className="w-75 mt-4 shadow-none" style={{marginLeft: "150px"}}>
                <CardTitle className="ml-3">{val.username}</CardTitle>
                <CardText className="ml-3">{val.comment}</CardText>
                </Card>
       
                
        
            )
        })
    }


    // this.state.articles[0].imagedetail
    
    render() {
        console.log(this.state);
        
        if (this.props.name) {
            return (
                <div>
                    <Card className="shadow-none">
            <CardHeader></CardHeader>
            <CardBody>
              <CardTitle></CardTitle>
              <Row> 
                <div className="col-9">
              <CardText>{ ReactHtmlParser(this.state.articles.content) }
      
              </CardText>
              </div>
              <div className="col-3">
              <img className="w-100" src={this.state.articles.imagedetail} />
             
              </div>
              </Row>
              
            </CardBody>
            
          </Card>
          
          
          <Card className="mt-4 w-25 container shadow-none">
            <CardHeader>
            <Label for="exampleText">Kolom Komentar</Label>
            </CardHeader>
            </Card>
    
                <div className="row mt-5 mr-2 justify-content-center">
                    <img className="pr-1"src={users} style={{width: "50px"}}/>
              <Input onChange={e => this.setState({inputComment: e.target.value})} on style={{width: "500px"}} placeholder="Komentar Anda..." type="textarea" name="text" id="exampleText" />
              
                </div>
                <Button onClick={this.onSubmitComment} className="mt-3" style={{marginLeft: "610px"}} size="sm" color="success">Submit</Button>{' '}
                
                {this.renderComment()}            
    
                </div>
          
          
    
          
                
                
            )
        }
        else {
            return (
                <div>
                    <Card className="shadow-none">
            <CardHeader></CardHeader>
            <CardBody>
              <CardTitle></CardTitle>
              <Row> 
                <div className="col-9">
              <CardText>{ ReactHtmlParser(this.state.articles.content) }
      
              </CardText>
              </div>
              <div className="col-3">
              <img className="w-100" src={this.state.articles.imagedetail} />
             
              </div>
              </Row>
              
            </CardBody>
            
          </Card>
          
          
          <Card className="mt-4 w-25 container shadow-none">
            <CardHeader>
            <Label for="exampleText">Kolom Komentar</Label>
            </CardHeader>
            </Card>
    
                {this.renderComment()}            
                
                </div>
                
    
          
          
    
          
                
                
            )
        }
    }



}

const mapStateToProps = (state) => {
    return {
      name : state.auth.username,
    }
} 
     


export default connect(mapStateToProps)(FigureDetail)