import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getJwt } from '../../../helpers/getJwt';

import {setUser} from '../../../store/user/actions'
import {connect} from "react-redux";

class AuthComponent extends Component {
  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const jwt = getJwt();
    if (!jwt) {
      this.props.setUser({
        user: null
      });
      return;
    }
    
    axios
    .get('/auth/getUser', { headers: { Authorization: getJwt() } 
    }).then(res => {
        console.log('status', res.data)
        this.props.setUser({
         user: res.data
        })
        this.saveUserData(res.data.id, res.data.name, res.data.avatar);
    }).catch(err => this.props.setUser({
        user: null
       }));
  }

  saveUserData(id, name, avatar) {
    window.sessionStorage.setItem('name', name);
    window.sessionStorage.setItem('id', id);
    window.sessionStorage.setItem('avatar', avatar);
  }
  
  render() {
    const { user } = this.props.user;
    if (user === undefined) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    if (user === null) {
      this.props.history.push('/signin');
    }

    return this.props.children;
  }
}

const mapStateToProps = (state) => {
  return {user: state.user.user}
}

const mapDispatchToProps = {
  setUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthComponent))