import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.css";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PrivateRoute from './PrivateRoute';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserList from './components/User/UserList';
import UserProfile from './components/User/UserProfile';
import Todo from './components/Todo/Todo';
import App from './App';

import { configureFakeBackend } from './config/fake-backend';
configureFakeBackend();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <PrivateRoute component={App} path='/' exact={true} />
        <PrivateRoute component={UserList} path='/users' exact={true} />
        <PrivateRoute component={UserProfile} path='/user' exact={true} />
        <PrivateRoute component={Todo} path='/todo' exact={true} />
        <Route component={Login} path='/login' exact={true} />
        <Route component={Register} path='/register' exact={true} />
      </Switch>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
