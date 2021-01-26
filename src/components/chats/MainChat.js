import React from 'react';
import ChatPlace from './ChatPlace';
import MessagePlace from './MessagePlace';

class MainChat extends React.Component {

    render () {
        return (
            <div className="p-2 bg-light h-100">
                <ChatPlace/>
                <MessagePlace/>
            </div>
        );
    }
}
export default MainChat;