import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getJwt } from '../../../helpers/getJwt';

class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const jwt = getJwt();
    if (!jwt) {
      this.setState({
        user: null
      });
      return;
    }

    axios
    .get('/auth/getUser', { headers: { Authorization: getJwt() } 
    }).then(res => {
        console.log('status', res.status)
        this.setState({
         user: res.data
        })
    }).catch(err => this.setState({
        user: null
       }));
  }

  render() {
    const { user } = this.state;
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

export default withRouter(AuthComponent);