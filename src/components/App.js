import React from 'react';
import {
    Switch,
  } from "react-router-dom";
import userRoute from '../routes/UserRoute';

class App extends React.Component{
    

    render(){
        return(
            <div className='h-100'>
                <Switch>
                    {userRoute}
                </Switch>
            </div>
            
        )
    }
}
export default App;