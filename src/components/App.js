import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
    Switch,
  } from "react-router-dom";
import {UserRoute} from '../routes/UserRoute';
import {FriendsRoute} from '../routes/FriendsRoute';
import { 
    onAuthStateChanged,
    getFriendsList,
    getFriendsRequestList,
    getRealTimeReceivedMessage,
    getRealTimeSentMessage,
    getRealTimeMessages,
    getUserSaveTheme,
    getUserRelatedGroups,
    getUserRelatedGroupsNotRealTime,
 } from '../redux/actions';


class App extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount = () =>{  
        this.props.onAuthStateChanged();
    }
    componentDidUpdate = () =>{
        console.log("Props app:",this.props);
        console.log("Props USSER is empty dlfjdfjldkfj:",_.isEmpty(this.props.user));
        if(!_.isEmpty(this.props.user)){
            this.props.getFriendsList(this.props.user.docId);
            this.props.getFriendsRequestList(this.props.user.docId);
            this.props.getRealTimeMessages(this.props.user);
            this.props.getUserSaveTheme(this.props.user);
           // this.props.getUserRelatedGroups(this.props.user);
           let sD = {
               uid:this.props.user.uid,
               username:this.props.user.username,
               email:this.props.user.email,
           }
            this.props.getUserRelatedGroupsNotRealTime(sD);
        }else{
            console.log("not ready")
        }

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
    if(state.authUser.user){
        user = state.authUser.user.data
    }
    return {
        user:user
    };
}
export default connect(mapStateToProps,{
    onAuthStateChanged,
    getFriendsList,
    getFriendsRequestList,
    getRealTimeReceivedMessage,
    getRealTimeSentMessage,
    getRealTimeMessages,
    getUserSaveTheme,
    getUserRelatedGroups,
    getUserRelatedGroupsNotRealTime
})(App);