import React from 'react';
import {connect} from 'react-redux';
import {
    Switch,
  } from "react-router-dom";
import {UserRoute} from '../routes/UserRoute';
import {FriendsRoute} from '../routes/FriendsRoute';
import { onAuthStateChanged,getUserProfile } from '../redux/actions';
import {fb} from '../firebase';

class App extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount = () =>{   
        this.props.onAuthStateChanged();
    }
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
const mapStateToProps = state =>{
    return state;
}
export default connect(mapStateToProps,{onAuthStateChanged})(App);