import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Switch } from "react-router-dom";
import {UserRoute} from '../routes/UserRoute';
import {FriendsRoute} from '../routes/FriendsRoute';
import { 
    onAuthStateChangedSecond,
    getFriendsList,
    getFriendsRequestList,
    getRealTimeReceivedMessage,
    getRealTimeSentMessage,
    getRealTimeMessages,
    getUserSaveTheme,
    getUserRelatedGroupsNotRealTime,
 } from '../redux/actions';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reload:true,
        }
    }
    
    componentDidMount = () =>{  
        //this.props.onAuthStateChanged();
        this.props.onAuthStateChangedSecond()
        .then(()=>{
            console.log("on auth state change finish!",this.props.user);
        })
    }
    componentDidUpdate = () =>{
        if(!_.isEmpty(this.props.user)){
            this.props.getFriendsList(this.props.user.docId);
            this.props.getFriendsRequestList(this.props.user.docId);
            this.props.getRealTimeMessages(this.props.user);
            this.props.getUserSaveTheme(this.props.user);
            let sD = {
                uid:this.props.user.uid,
                username:this.props.user.username,
                email:this.props.user.email,
            }
            this.props.getUserRelatedGroupsNotRealTime(sD);
            if(this.state.reload){
                this.setState({reload:false});
                
            }
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
    onAuthStateChangedSecond,
    getFriendsList,
    getFriendsRequestList,
    getRealTimeReceivedMessage,
    getRealTimeSentMessage,
    getRealTimeMessages,
    getUserSaveTheme,
    getUserRelatedGroupsNotRealTime
})(App);