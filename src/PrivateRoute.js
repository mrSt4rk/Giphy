import { Route, Redirect } from 'react-router-dom';
import React from 'react';

const privateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token === 'fake-jwt-token' ?
                <Component {...props} />
                :
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )}>
        </Route>
    );
}

export default privateRoute;
