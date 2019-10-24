import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Row, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import users from "../helpers/images/userblue.png"
import Dropdown from "./Dropdown"
import Swal from 'sweetalert2'
var moment = require('moment')




class FigureDetail extends Component {

  

    state = {
        articles: "",
        comments: [],
        inputComment: [],
        
        
            
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

        if (inputComment == "") {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Anda belum berlangganan',
                footer: '<a href=/premium>klik disini untuk berlangganan</a>'
              })
        }
        else {
            axios.post(
                `http://localhost:4500/comment/addcomment`,
                {
                    username: this.props.name,
                    comment: inputComment,
                    articleid:  this.props.match.params.id,
                    created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss.SSS")
                }
    
             
            ).then((res) => {
                this.getComment()
            })
        }

        
    }
    
    componentDidMount() {
        this.getArticle()
        this.getComment()
        
    }

    renderComment = () => {

        return this.state.comments.map((val) => {
            return (
               
                
                <Card className="w-75 mt-4 shadow-none" style={{marginLeft: "150px"}}>
                
                <CardTitle className="ml-3 font-weight-bold">
                    {val.username}
                    <span className="ml-1" style={{fontSize: "10px", color: "grey"}}>
                    { moment(val.created_at).fromNow()}
                    </span>
                    <span className="border-right p-1 h-25"></span>
                    <Button className="m-1 p-0" style={{color: "gray"}} color="link" size="sm" onClick={() => {this.onEditButton()}}>Edit</Button>
                    <Button className="p-0" style={{color: "gray"}} color="link" size="sm" onClick={()  => {this.onDeleteButton()}}>Delete</Button>
                </CardTitle>
                
    
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
          
         
          
          <Card className="mt-4 container shadow-none text-center" style={{backgroundColor: "rgb(245, 250, 255)", width: "300px", padding: "10px"}}>
            
            <Label className="font-weight-bold pt-2" style={{fontSize: "20px"}}>Kolom Komentar</Label>
           
            </Card>

            <div className="border-top border-dark mt-4"></div>
    
                <div className="row mt-4 mr-2 justify-content-center">
                    <img className="pr-1"src={users} style={{width: "60px"}}/>
              <Input onChange={e => this.setState({inputComment: e.target.value})} style={{width: "500px"}} placeholder="Komentar Anda..." type="textarea" name="text" id="exampleText" />
              
                </div>
                <Button onClick={this.onSubmitComment} className="mt-3" style={{marginLeft: "610px"}} size="sm" outline color="primary">Submit</Button>{' '}
                
                <div>
                <div className="font-weight-bold" style={{marginLeft: "150px"}}>
                {this.state.comments.length} Komentar
                </div>
                <div className="mb-3">
                {this.renderComment()}
                </div>           
                </div>
                
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
          
          
          <Card className="mt-4 container shadow-none text-center" style={{backgroundColor: "rgb(245, 250, 255)", width: "300px", padding: "10px"}}>
            
            <Label className="font-weight-bold pt-2" style={{fontSize: "20px"}}>Kolom Komentar</Label>
           
            </Card>

            <div className="border-top border-dark mt-4"></div>
    
                <div>
                <div className="font-weight-bold mt-3" style={{marginLeft: "150px"}}>
                {this.state.comments.length} Komentar
                </div>
                <div className="mb-3">
                {this.renderComment()}
                </div>
                            
                </div>            
                
                
                
              
               
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