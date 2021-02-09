import React from 'react';
import './Message.css';
import _ from 'lodash';

class MessageItem extends React.Component{
    renderMessage(messages){
        return messages.map( message => {
            let align;
            if(message.to){
                 align = 'align-self-end';
            }else{
                 align = 'align-self-start';
            }
            //let time = new Date(message.time.seconds).toString() ;
           
            return(
                <div className={align} key= {messages.text}>
                    <p className="message">
                      {message.text}
                    </p>
                </div>
            )
        })
    }

    render(){
        const {sent,receive} = this.props.messages;
        let messages = [...sent,...receive];
        messages = _.sortBy(messages,mes=>{
            return mes.time
        })
        messages = messages.reverse()
        messages = messages.slice(0,10);
        messages = messages.reverse();
        return(
            <>
            {this.renderMessage(messages)}
            </>
        );
    }
}
export default MessageItem;