import React from 'react';
import {
    Switch,
  } from "react-router-dom";
import {UserRoute} from '../routes/UserRoute';
import {FriendsRoute} from '../routes/FriendsRoute';

class App extends React.Component{

    render(){
        return(
            <div className='h-100'>
                <Switch>
                    {UserRoute}
                    {FriendsRoute}
                </Switch>
            </div>
            
        )
    }
}
export default App;