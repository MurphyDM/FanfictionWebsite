import React, { Component } from 'react';

import {setUser} from '../../store/user/actions'
import {connect} from "react-redux";
import {getJwt} from '../../helpers/getJwt'

import Header from '../components/Header'
import AuthHeader from '../components/AuthHeader'

function HeaderContainer(props){
  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  }
    return getJwt()?<AuthHeader avatar={window.sessionStorage.getItem('avatar')} logout = {logout}/>: <Header/>   
}

const mapStateToProps = (state) => {
  return {user: state.user.user.user}
}

const mapDispatchToProps = {
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)