import React from 'react';
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
   
    render () {
        return (
            <div className="p-2 bg-light h-100">
                <ChatPlace friend={this.findFriendToChat(this.props)}/>
                <MessagePlace friend={this.findFriendToChat(this.props)}/>
            </div>
        );
    }
}

export default MainChat;