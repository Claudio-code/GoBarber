import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {
    const signed = false;
    if (!signed && isPrivate) {
        return <Redirect to="/" />;
    }
    if (signed && !isPrivate) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Route
            {...rest}
            component={Component}
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