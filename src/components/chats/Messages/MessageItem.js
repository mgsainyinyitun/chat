import React from 'react';
import './Message.css';

class MessageItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    renderMessage(messages){
        
        return messages.map( message => {
            const align = message.person ==='friend'?'align-self-start':'align-self-end';
            return(
                <div className={align}>
                    <span className="message">
                        {message.text}
                    </span>
                    <hr style={{margin:6,color:"white"}} />
                </div>
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