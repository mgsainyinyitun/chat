import React from 'react';
import {Empty} from 'antd';
import './GroupMessage.css';
import _ from 'lodash';


class GroupMessagesItem extends React.Component {
    renderMessages(messages){
        const style = this.props.theme === 'dark'?'message-dark':'message';
        if(messages.length === 0){
            return <Empty className="w-100 align-self-center" description="No messages or Reload" />
        }
        return messages.map((message,index) => {
            let align;
            if(message.from === this.props.user.uid){
                align = 'align-self-end';
            }else{
                align = 'align-self-start';
            }
            return (
                <div className={align} key={index} >
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
               {this.renderMessages(this.props.messages)}
            </>
        )
    }
}

export default GroupMessagesItem;