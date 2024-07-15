import React from 'react';
import FacebookLogin from 'react-facebook-login';
const backendURL = process.env.REACT_APP_BACKEND_URL || 'https://localhost:5000';

const FacebookLoginButton = ({ responseFacebook }) => {
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      autoLoad={false}
      fields="name,email,picture"
      scope="public_profile,email,pages_show_list,pages_read_engagement,read_insights"
      callback={responseFacebook}
      redirectUri={`${backendURL}/api/facebook/callback`}
    />
  );
};

export default FacebookLoginButton;
