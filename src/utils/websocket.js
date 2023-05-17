import React from "react";
import { getData, insertData } from "../api/internal";
import {
  buyerInformations as buyerInformationsAPI,
  blockedUsers as blockedUsersAPI,
  transaction as transactionAPI,
} from "../api/state";
import { isLogged } from "../api/connect";
import { useDispatch, useSelector } from "react-redux";
import { WEBSOCKET_URL } from "../config";
import WebSocket from "react-websocket";

const WebSocketManager = () => {

  const {
    reader,
    logged,
    selectedArticles,
    blockedUsers
  } = useSelector(state => ({
    reader: getData(state, 'reader'),
    logged: isLogged(state),
    selectedArticles: getData(state, 'selectedArticles') || {},
    blockedUsers: blockedUsersAPI.getCurrentFromState(state),
  }));

  const dispatch = useDispatch();
  const setReader = React.useCallback((value) => dispatch(insertData('reader', value)),[dispatch]);
  const setConnexionBadge = React.useCallback((value) => dispatch(insertData('connexionBadge', value)), [dispatch]);

  const getBuyerInfo = React.useCallback((badgeID) => dispatch(buyerInformationsAPI.create({ badge_id: badgeID })), [dispatch]);

  const handlePayment = React.useCallback((badgeID) =>{
    const blockedCas = blockedUsers ? blockedUsers.getUsers().map(u => u.getCas()) : [];

    //recuperer le cas depuis le badgeid (dependant de la simde car utilise ginger)

    if(blockedCas.includes(badgeID)) {
      return (dispatch(transactionAPI.error({ error: { message: 'Utilisateur Bloqué'}})));
    }

    const items = Object.entries(selectedArticles).map(([, {article, qte}]) => [article.getKey(), qte]);
    dispatch(transactionAPI.create({ badge_id: badgeID, obj_ids: items }));
  }, [dispatch, blockedUsers, selectedArticles]);


  const onMessage = React.useCallback((badgeID) => {
    if(!reader) {
      return
    }

    if(!logged) {
      return setConnexionBadge(badgeID);
    }

    if(Object.keys(selectedArticles).length) {
      return handlePayment(badgeID);
    }

    return getBuyerInfo(badgeID);

  }, [logged, reader, setConnexionBadge, selectedArticles, getBuyerInfo, handlePayment]);

  return (
    <WebSocket
      url = { WEBSOCKET_URL }
      onOpen={() => setReader(true)}
      onClose={() => setReader(false)}
      onMessage={(data) => onMessage(data.substr(13, data.length))}
      />
  )
}

export default WebSocketManager;
