import React from 'react';
import {Empty,Avatar} from 'antd';
import './GroupMessage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


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
                    <div className={`${style}`}>
                        <p style={{fontSize:15}}>
                            <Avatar 
                                size={25} 
                                style={{marginRight:10}}
                                icon={<FontAwesomeIcon icon={faUser} />}
                            />
                        {message.fromName}
                        </p>
                        {message.text}
                    </div>
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