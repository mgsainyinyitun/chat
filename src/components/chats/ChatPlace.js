import React from 'react';
import {Card} from 'react-bootstrap';
import MessageList from './Messages/MessageList';

class ChatPlace extends React.Component{
    render(){
        return(
            <>
            <Card 
                className="p-3"
                style={{height:"90%"}}
            >
                <Card.Title>
                   <p style={{color:"teal"}}>Sai Nyi</p> 
                   <hr/>
                </Card.Title>
                <Card.Body>
                    <MessageList/> 
                </Card.Body>
                  
            </Card>
            </>
            
        );
    }
}
export default ChatPlace;