import React from 'react';
import { Route } from 'react-router-dom';
import {ROUTE,PAGE} from './constant';
import Home from '../components/users/home/Home';

export const FriendsRoute =   [
    <Route
        key = '1'
        path = {`${ROUTE.FRIENDS.CHAT}/:id`}
        exact
        component = {(props) => <Home {...props} page = { PAGE.FRIENDS.CHAT }/> }
    />,
    <Route 
        key = '2'
        path = {ROUTE.FRIENDS.GROUPS.MAIN}
        exact
        component = {(props) => <Home {...props} page = { PAGE.FRIENDS.GROUPS.MAIN} /> }
    />,
    <Route
        key = '3'
        path = {ROUTE.FRIENDS.GROUPS.CHAT}
        exact 
        component = { (props) => <Home {...props} page = { PAGE.FRIENDS.GROUPS.CHAT}/> }
    />
]