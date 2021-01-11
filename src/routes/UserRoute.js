import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/users/home/Home';
import LoginPage from '../components/users/Login/LoginPage';
import RegisterPage from '../components/users/Register/RegisterPage';
export default [
  <Route
    key="1"
    path="/"
    exact
    component={(props) => <Home {...props} />}
  />,
  <Route
    key="2"
    path="/login"
    exact
    component={(props) => <LoginPage {...props} />}
  />,
  <Route
    key="3"
    path="/register"
    exact
    component={(props) => <RegisterPage {...props} />}
  />,
]