import React from 'react';
import {connect} from 'react-redux';
import ChatPlace from './ChatPlace';
import MessagePlace from './MessagePlace';

class MainChat extends React.Component {
    constructor(props){
        super(props);
    }

    findFriendToChat = ({friendList,friendId}) =>{
        return friendList.find((fri) =>{
            return fri.uid === friendId;
        })
    }
    componentDidUpdate(){
        console.log("Main Chat",this.props);
    }
   
    render () {
        console.log("Theme is::::",this.props.theme);
        const style = this.props.theme === 'dark'?'bg-secondary':'bg-light';
        return (
            <div className={`p-2 h-100 ${style}`}>
                <ChatPlace 
                    friend={this.findFriendToChat(this.props)}
                    theme = {this.props.theme}
                />
                <MessagePlace 
                    friend={this.findFriendToChat(this.props)}
                    theme = {this.props.theme}
                />
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return state;
}

export default connect(mapStateToProps)(MainChat);