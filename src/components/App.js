import React from 'react';
import {connect} from 'react-redux';
import { Switch } from "react-router-dom";
import {UserRoute} from '../routes/UserRoute';
import {FriendsRoute} from '../routes/FriendsRoute';
import { onAuthStateChanged } from '../redux/actions';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reload:true,
            fullscreen:false,
        }
    }
    
    componentDidMount = () =>{  
        this.props.onAuthStateChanged()
        .then(()=>{
            console.log("on auth state change finish!",this.props.user);
        })
    
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
    let user = {};
    if(state.authUser){
        if(state.authUser.user)user = state.authUser.user.data
    }
    return {
        user:user
    };
}
export default connect(mapStateToProps,{
    onAuthStateChanged,
})(App);