import React from 'react';
import {Empty} from 'antd';
import './Message.css';
import _ from 'lodash';

class MessageItem extends React.Component{

    renderMessage(messages){
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
                    <p className="message">
                      {message.text}
                    </p>
                </div>
            )
        })
    }

    render(){
       // const {sent,receive} = this.props.messages;
       // let messages = [...sent,...receive];
      //  messages = _.sortBy(messages,mes=>{
      //      return mes.time
      //  })
       // messages = messages.reverse()
       // messages = messages.slice(0,10);
       // messages = messages.reverse();
        return(
            <>
            {this.renderMessage(this.props.messages)}
            </>
        );
    }
}
export default MessageItem;