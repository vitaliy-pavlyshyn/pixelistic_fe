import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';

import PassportBtn from '../passport-btn/PassportBtn';

const googleLoginError = (error) => {
  console.log("google login error", error);
};

export class GoogleAuth extends Component {
  render() {
    return <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_ID}
      onSuccess={this.responseGoogle}
      onFailure={googleLoginError}
      render={props => <PassportBtn onClick={props.onClick} name="google" />}
    />
  }

  responseGoogle = res => this.props.handleGoogle(res.profileObj);
};

GoogleAuth.propTypes = {
  handleGoogle: PropTypes.func.isRequired
};

export default GoogleAuth;
