import React from 'react';
import { Route } from 'react-router-dom';
import {ROUTE,PAGE} from './constant';
import Home from '../components/users/home/Home';

export default [
    <Route
        key = '1'
        path = {ROUTE.FRIENDS.CHAT}
        exact
        component = {(props) => <Home {...props} page = { PAGE.FRIENDS.CHAT }/> }
    />
]