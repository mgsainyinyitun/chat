import React from 'react';
import MessageItem from './MessageItem';

class MessageList extends React.Component{
    render(){
        return(
            <div 
             className="d-flex flex-column align-items-end"
             >
                <MessageItem messages = {this.props.messages} />
            </div>
        );
    }
}
export default MessageList;