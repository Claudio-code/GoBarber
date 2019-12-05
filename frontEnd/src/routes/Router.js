import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/defaut';

import store from '../store';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }
  
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }
  let Layout;

  if (signed) {
    Layout = DefaultLayout;  
  } else {
    Layout = AuthLayout;
  }


  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.prototype = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

RouteWrapper.defalutProps = {
  isPrivate: false,
};