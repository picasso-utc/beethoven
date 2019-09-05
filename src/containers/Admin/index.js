import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux'
import { Container, Col, Row } from 'reactstrap';

import AdminNav from './adminNav'
import AdminWebTvContent from './AdminContents/adminWebTvContent'
import AdminMessagesContent from './AdminContents/adminMessagesContent'
import AdminImagesContent from './AdminContents/adminImagesContent'

import AdminGestion from './AdminContents/adminGestion'
import AdminGoodiesContent from './AdminContents/adminGoodiesContent'
import AdminMultiInfo from './AdminContents/adminMultiInfo'

class AdminPanel extends Component {
  render() {
    const {sessionId, username, adminIndex} = this.props
    return(
      <div
        className ="AdminPanel"
        >
        {sessionId!== null && username !== null   ?
          <Container fluid>
            <Row>
              <Col
                md="1"

                style = {{

                  padding:'0px'
                }}
                ><AdminNav></AdminNav> </Col>
              <Col md="11">
                {adminIndex===1 && <AdminWebTvContent/>}
                {adminIndex===2 && <AdminMultiInfo/>}
                {adminIndex===3 && <AdminMessagesContent/>}
                {adminIndex===4 && <AdminGestion/>}
                {adminIndex===5 && <AdminGoodiesContent/>}
              </Col>
            </Row>
          </Container>
          :
          ""
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
    adminIndex : state.admin.AdminNav || null
  };
}


let mapDispatchToProps = (dispatch)=>{
  return{
    //myfunction : ()=> dispatch(myfunction())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);
