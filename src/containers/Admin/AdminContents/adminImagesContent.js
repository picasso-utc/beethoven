import React, { Component } from 'react';
import '../../../App.css';
import {connect} from 'react-redux'
import axios from 'axios'

import {SERVICE_URL} from '../../../Utils/config'

import {InputGroup, InputGroupAddon, InputGroupText, Input, Button, Label} from 'reactstrap'
import { Container, Col, Row, Table } from 'reactstrap';

import {MdMessage} from 'react-icons/md'
import {FaTrash} from 'react-icons/fa'

import {getMessagesList, addMessage, deleteMessage} from '../../../actions'



class AdminImagesContent extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      title : "",
      text : ""
    }

  }
  componentWillMount()
  {
    const {getMessagesList} = this.props;
    getMessagesList();

  }

   fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]})
  }

  uploadHandler = () => {

    const formData = new FormData()
    formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name)
    console.log(formData);
    axios.post('http://37.139.25.111/upload/', formData)
    }


  render() {
    const {sessionId, username, messages} = this.props

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }



    return(
      <div
        className ="AdminPanel"
        >
        {sessionId!== null && username !== null ?

          <Container fluid>
            <Row >
              <Col xs='12'>  <br></br>

                <h2>Interface Admin - Gestion des Images</h2>
                <br></br>
              </Col>
            </Row>
            <Row >
              <Col xs={{size:12}} lg={{size:6, offset:3}}>
              <div className="previewComponent">
                <input type="file" onChange={this.fileChangedHandler}></input>
                <button onClick={this.uploadHandler}>Upload!</button>
              </div>
              </Col>
            </Row>
        </Container>
          :""

        }
      </div>
    )
  }
}

let mapStateToProps = (state)=>{
  return{
    //MyVar : state.location.MyVar || defaultValue
    sessionId : state.cas.sessionId || null,
    username : state.cas.username || null,
    messages : state.webTV.messages || null,
  };
}


let mapDispatchToProps = (dispatch)=>{
  return{
    //myfunction : ()=> dispatch(myfunction())
    getMessagesList : ()=>dispatch(getMessagesList()),
    addMessage : (title, text)=>dispatch(addMessage(title, text)),
    deleteMessage : (idMessage)=>dispatch(deleteMessage(idMessage))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(AdminImagesContent);
