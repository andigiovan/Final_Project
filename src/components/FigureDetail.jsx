import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Card, CardHeader, CardFooter, CardSubtitle, CardBody,
    CardTitle, CardText, CardImg, Row, Label, Input, Button} from 'reactstrap';
import users from "../helpers/images/userblue.png"
import Swal from 'sweetalert2'
var moment = require('moment')





class FigureDetail extends Component {

  

    state = {
        articles: "",
        comments: [],
        inputComment: [],
        selectedId: 0,
        editedComment: ""
        
        
        
        
        
            
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

    onEditComment = (id, comment) => {
        this.setState({
            selectedId: id,
            editedComment : comment,
            
            
        })
        
    }

    onEditCancel = () => {
        this.setState({selectedId: 0})
    }

    onEditSubmit = () => {
        axios.patch (
        `http://localhost:4500/comment/editcomment`, 
        {
           id: this.state.selectedId,
           comment: this.state.editedComment,
           
        }
        )
        .then((res) => {
            
            axios.patch (
                `http://localhost:4500/comment/updatecomment`, 
                {
                   id: this.state.selectedId
                   
                }
                )
        })
        .then((res) => {
            this.getComment()
            this.setState({selectedId: 0})
        }).catch((err) => {
            console.log(err)
            
        })
    }



    onDeleteComment = (id) => {
        axios.delete(
        `http://localhost:4500/comment/deletecomment/${id}`  
        )
        .then((res) => {
        this.getComment()
        })
    }

    
    onSubmitComment = () => {

        let inputComment = this.state.inputComment

        if (inputComment == "") {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Komen kosong',
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
            if (val.id !== this.state.selectedId) {
                if (this.props.name === val.username) {
                    return (
                   
                    
                        <Card className="w-75 mt-4 shadow-none" style={{marginLeft: "150px"}}>
                        
                        <CardTitle className="ml-3 font-weight-bold">
                            {val.username}
                            <span className="ml-1" style={{fontSize: "10px", color: "grey"}}>
                            { moment(val.created_at).fromNow()} {val.edited}
                            </span>
                            <span className="border-right p-1 h-25"></span>
                            <Button className="m-1 p-0" style={{color: "gray"}} color="link" size="sm" onClick={() => {this.onEditComment(val.id, val.comment, val.created_at)}}>Edit</Button>
                            <Button className="p-0" style={{color: "gray"}} color="link" size="sm" onClick={()  => {this.onDeleteComment(val.id)}}>Delete</Button>
                        </CardTitle>
                        
            
                        <CardText className="ml-3 mb-1">{val.comment}</CardText>
                        </Card>
                        
                       
                           )
               
                }
                else if (this.props.name !== val.username && this.props.role !== "admin") {
                    return (
                   
                    
                        <Card className="w-75 mt-4 shadow-none" style={{marginLeft: "150px"}}>
                        
                        <CardTitle className="ml-3 font-weight-bold">
                            {val.username}
                            <span className="ml-1" style={{fontSize: "10px", color: "grey"}}>
                            { moment(val.created_at).fromNow()} {val.edited}
                            </span>
                           
                            
                        </CardTitle>
                        
            
                        <CardText className="ml-3 mb-1">{val.comment}</CardText>
                        </Card>
                        
                       
                           )
                }
                else if (this.props.role === "admin") {
                    return (
                   
                    
                        <Card className="w-75 mt-4 shadow-none" style={{marginLeft: "150px"}}>
                        
                        <CardTitle className="ml-3 font-weight-bold">
                            {val.username}
                            <span className="ml-1" style={{fontSize: "10px", color: "grey"}}>
                            { moment(val.created_at).fromNow()} 
                            </span>
                            <span className="border-right p-1 h-25"></span>
                            <Button className="ml-1 p-0" style={{color: "gray"}} color="link" size="sm" onClick={()  => {this.onDeleteComment(val.id)}}>Delete</Button>
                        </CardTitle>
                            
                        
            
                        <CardText className="ml-3 mb-1">{val.comment}</CardText>
                        </Card>
                        
                       
                           )
                }
                else if (!this.props.name) {
                    return (
                        
                        <Card className="w-75 mt-4 shadow-none" style={{marginLeft: "150px"}}>
                        
                        <CardTitle className="ml-3 font-weight-bold">
                            {val.username}
                            <span className="ml-1" style={{fontSize: "10px", color: "grey"}}>
                            { moment(val.created_at).fromNow()}
                            </span>
                            
                        </CardTitle>
                            <CardText className="ml-3 mb-1">{val.comment}</CardText>
                        </Card>
                            
                                )
                     }
            }

            
                 else {

                    return (
               
                
                        <Card key={val.id} className="w-75 mt-4 shadow-none" style={{marginLeft: "150px"}}>
                        
                        <CardTitle className="ml-3 font-weight-bold">
                            {val.username}
                            <span className="ml-1" style={{fontSize: "10px", color: "grey"}}>
                            { moment(val.created_at).fromNow()}
                            </span>
                            <span className="border-right p-1 h-25"></span>
                            <Button className="m-1 p-0" style={{color: "gray"}} color="link" size="sm" onClick={() => {this.onEditSubmit()}}>Submit</Button>
                            <Button className="p-0" style={{color: "gray"}} color="link" size="sm" onClick={()  => {this.onEditCancel()}}>Cancel</Button>
                        </CardTitle>
                        
            
                        <CardText className="ml-3 mb-1">
                                <input 
                                type="text" 
                                className="form-control" 
                                value={this.state.editedComment} 
                                onChange = {(e) => this.setState({editedComment: e.target.value})}
                            />
                        
                        </CardText>
                        </Card>
                        
                       
                           )

                 }
     
                    })
               }
                        
               
                    
        
               // this.state.articles[0].imagedetail
               
               render() {
                   console.log(this.state);
                   
                   if (this.props.name) {
                       return (
                           <div>
                               
                               <Card className="shadow-none">
                               <CardHeader style={{backgroundColor: "white", fontSize: "30px"}} className="font-weight-bold logo">{this.state.articles.name}</CardHeader>
                       <CardBody>
                         <CardTitle></CardTitle>
                         <Row> 
                           <div className="col-9">
                         <CardText>{ ReactHtmlParser(this.state.articles.content) }</CardText>
                         </div>
                         <div className="col-3">
                         <Card className="shadow-none">
                          <span className="text-center font-weight-bold">{this.state.articles.name}</span>
                   <a href={this.state.articles.imagedetail}>
                   <CardImg className="text-center pl-4 pt-2" style={{width: "270px"}} src={this.state.articles.imagedetail} />
                   </a>
                   <CardBody>
                     
                     <CardText>
                         <span className="mr-2 font-weight-bold logo">Lahir
                         
                         </span>
                         <span className="logo">{this.state.articles.born}</span>
                         <div>
                         <span className="font-weight-bold logo">Meninggal</span>
                         <span className="ml-2 logo">{this.state.articles.dead}</span>
                         </div>
                         <div>
                         <span className="font-weight-bold logo">Kewarganegaraan</span>
                         <span className="ml-2 logo">{this.state.articles.nationality}</span>
                         </div>
                         <div>
                         <span className="font-weight-bold logo">Era</span>
                         <span className="ml-2 logo">{this.state.articles.era}</span>
                         </div>
                         <div>
                         <span className="font-weight-bold logo">Region</span>
                         <span className="ml-2 logo">{this.state.articles.region}</span>
                         </div>
                     </CardText>
                   </CardBody>
                 </Card>
                         </div>
                         </Row>
                         <CardText>
                             {ReactHtmlParser(this.state.articles.contentextra)}
                         </CardText>
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
                         <CardText>{ ReactHtmlParser(this.state.articles.content) }</CardText>
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
                 id : state.auth.id,
                 name : state.auth.username,
                 role : state.auth.role
               }
           } 
                
           
           
           export default connect(mapStateToProps)(FigureDetail)
                    
                
                
               
                
                              
                
               
               
       
                

