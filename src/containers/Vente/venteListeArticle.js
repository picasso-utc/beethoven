import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux';

import {getChosenArticle, getListArticles } from "../../actions"

/*Affichage des articles dans la colonne de droites par catégorie*/
class ListeArticle extends Component {
  componentWillMount() {
    const { sessionId} = this.props;
    const { getListArticles } = this.props;
    getListArticles(sessionId);
  }

  componentWillUnmount() {
      clearInterval();
  }
  render() {
    const { id_Categ, listArticles, selectedArticles } = this.props
    const { getChosenArticle } = this.props
    const { sessionId } = this.props;
    const { getListArticles } = this.props;
    var styleButton = {background: 'none',
                       minWidth: '120px',
                       minHeight: '120px',
                       outlineStyle: 'none',
                       pointerEvents: 'none',
                       outline: 'none'
                      }
    var styleDiv = {
      background: 'white',
      minWidth: '90px',
      minHeight: '90px',
      maxWidth: '90px',
      maxHeight: '90px',
      borderRadius: '10px',
      color: 'black',
      margin: 'auto',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        overflow: 'hidden'
    }
    var styleImg = { borderRadius: '10px',
                     maxHeight: '90px',
                     maxWidth: '90px'
                    }
    var displayArticle = [];
    listArticles.forEach(function(element,i) {
      if(element.categorie_id===id_Categ){
        if(i===0){
          if(element.image_url){
            displayArticle.push(
              <div class="col-md-5ths col-xs-6 p-0" onMouseDown={() => getChosenArticle(element.id,element.name,element.price, selectedArticles)}>
                <button type="button" class="btn btn-lg btn-block p-0" style={styleButton}>
                  <img class="card-img-top" src={element.image_url} alt="Card" style={styleImg} width="80" height="80"></img>
                </button>
              </div>
              )
            }
            else{
              displayArticle.push(
                <div class="col-md-5ths col-xs-6 p-0" onMouseDown={() => getChosenArticle(element.id,element.name,element.price, selectedArticles)}>
                  <button type="button" class="btn btn-lg btn-block p-1" style={styleButton}>
                      <div class="card-img-top" style={styleDiv}>{element.name}</div>
                  </button>
                </div>
                )
            }
        }
        if(element.image_url){
          displayArticle.push(
            <div class="col-md-5ths col-xs-6 p-0" onMouseDown={() => getChosenArticle(element.id,element.name,element.price, selectedArticles)}>
              <button type="button" class="btn btn-lg btn-block p-1" style={styleButton}>
                <img class="card-img-top" draggable="false" src={element.image_url} alt="Card" style={styleImg} width="100" height="100"></img>
              </button>
            </div>
            )
          }
          else{
            displayArticle.push(
              <div class="col-md-5ths col-xs-6 p-0" onMouseDown={() => getChosenArticle(element.id,element.name,element.price, selectedArticles)}>
                <button type="button" class="btn btn-lg btn-block p-1" style={styleButton}>
                    <div class="card-img-top" style={styleDiv}>{element.name}</div>
                </button>
              </div>
              )
          }
      }
    });
    return (
        <div class="d-flex flex-wrap">
          {displayArticle}
        </div>
    );
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    sessionId : state.cas.sessionId || null,
    selectedArticles : state.vente.selectedArticles || [],
    id_Categ : state.vente.id_Categ || null,
    listArticles : state.vente.listArticles || [],
    loadedArt : state.vente.loadedArt || false
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getChosenArticle : (id,name,price,list)=> dispatch(getChosenArticle(id,name,price,list)),
    getListArticles : (sessionId)=> dispatch(getListArticles(sessionId))
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps)(ListeArticle);
