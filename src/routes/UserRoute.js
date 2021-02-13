import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/users/home/Home';
import LoginPage from '../components/users/Login/LoginPage';
import Logout from '../components/users/Logout/Logout';
import RegisterPage from '../components/users/Register/RegisterPage';
import {PAGE,ROUTE } from './constant';
export const UserRoute = [
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
  />,
  <Route
    key = "5"
    path = {ROUTE.USERS.LOGOUT}
    exact
    component = {(props) => <Logout {...props} />} 
  />,
  <Route
    key = "6"
    path = {ROUTE.ABOUT_US}
    exact
    component = {(props ) => <Home {...props} page = {PAGE.ABOUT_US} /> }
    />
]