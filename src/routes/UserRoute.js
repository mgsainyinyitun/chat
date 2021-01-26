import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/users/home/Home';
import LoginPage from '../components/users/Login/LoginPage';
import RegisterPage from '../components/users/Register/RegisterPage';
import {PAGE,ROUTE } from './constant';
export default [
  <Route
    key="1"
    path={ROUTE.USERS.HOME}
    exact
    component={(props) => <Home {...props} page = {PAGE.USERS.HOME} />}
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
  <Route 
    key="4"
    path = {ROUTE.USERS.PROFILE}
    exact
    component = {(props) => <Home {...props} page = {PAGE.USERS.PROFILE} /> }
  />
]