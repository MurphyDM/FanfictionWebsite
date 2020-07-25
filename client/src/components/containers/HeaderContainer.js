import React, { Component } from 'react';

import {setUser} from '../../store/user/actions'
import {connect} from "react-redux";

import Header from '../components/Header'
import AuthHeader from '../components/AuthHeader'

function HeaderContainer(props){
    return (props.user)?<AuthHeader avatar={props.user.avatar}/>: <Header/>   
}

const mapStateToProps = (state) => {
  return {user: state.user.user.user}
}

const mapDispatchToProps = {
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)