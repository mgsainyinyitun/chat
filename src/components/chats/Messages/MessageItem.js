import React from 'react';
import {Empty} from 'antd';
import './Message.css';


class MessageItem extends React.Component{

    renderMessage(messages){
        const style = this.props.theme === 'dark'?'message-dark':'message';
        if(messages.length === 0){
            return(
                <Empty className="w-100 align-self-center" description="No Messages or Reload"/>
            )
        }
        return messages.map( (message,index) => {
            let align;
            if(message.to){
                 align = 'align-self-end';
            }else{
                 align = 'align-self-start';
            }
            
            //let time = new Date(message.time.seconds).toString() ;
            return(
                <div className={align} key= {index}>
                    <p className={`${style}`}>
                      {message.text}
                    </p>
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