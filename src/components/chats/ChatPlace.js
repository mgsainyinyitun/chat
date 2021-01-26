import React from 'react';
import {Card} from 'antd';
import MessageList from './Messages/MessageList';

class ChatPlace extends React.Component{
    render(){
        return(
            <>
            <h3 style={{backgroundColor:"white",padding:10,border:"1px black",color:'blue'}}>Sai Nyi</h3>
            <Card 
                style={{height:"67%",overflow:'scroll'}}
            >
                <MessageList/>   
            </Card>
            </>
            
        );
    }
}
export default ChatPlace;