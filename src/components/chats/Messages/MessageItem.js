import React from 'react';
import './Message.css';

class MessageItem extends React.Component{
    constructor(props){
        super(props);
    }

    renderMessage(messages){
        
        return messages.map( message => {
            const align = message.person ==='friend'?'align-self-start':'align-self-end';
            return(
                <span className={align}>
                    <span className="message">
                        {message.text}
                    </span>
                    <hr style={{margin:6,color:"white"}} />
                </span>
            )
        })
    }

    render(){
        return(
            <>
            {this.renderMessage(this.props.messages)}
            </>
        );
    }
}
export default MessageItem;