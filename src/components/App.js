import React from 'react';
import {
    Switch,
  } from "react-router-dom";
import userRoute from '../routes/UserRoute';
import friendRoute from '../routes/FriendsRoute';

class App extends React.Component{
    

    render(){
        return(
            <div className='h-100'>
                <Switch>
                    {userRoute}
                    {friendRoute}
                </Switch>
            </div>
            
        )
    }
}
export default App;