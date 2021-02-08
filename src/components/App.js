import React from 'react';
import {connect} from 'react-redux';
import {
    Switch,
  } from "react-router-dom";
import {UserRoute} from '../routes/UserRoute';
import {FriendsRoute} from '../routes/FriendsRoute';
import { onAuthStateChanged,getFriendsList,getFriendsRequestList } from '../redux/actions';
import {fb} from '../firebase';




class App extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount = () =>{  
        this.props.onAuthStateChanged();
    }
    componentDidUpdate = () =>{
        console.log("Props app:",this.props);
        if(this.props.user){
            this.props.getFriendsList(this.props.user.docId);
            this.props.getFriendsRequestList(this.props.user.docId);
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
export default connect(mapStateToProps,
    {onAuthStateChanged,getFriendsList,getFriendsRequestList})(App);