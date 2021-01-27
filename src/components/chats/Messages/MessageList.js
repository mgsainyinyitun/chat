import React from 'react';
import MessageItem from './MessageItem';
import {messages} from './TestMessage';

class MessageList extends React.Component{

    render(){
        return(
            <div 
             className="d-flex flex-column align-items-end"
             >
                <MessageItem messages = {messages} />
            </div>
        );
    }
}
export default MessageList;