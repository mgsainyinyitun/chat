import React from 'react';
import MessageItem from './MessageItem';
import {connect} from 'react-redux';
import _ from 'lodash';

class MessageList extends React.Component{
    sortMessageByTime = (messages) =>{
        return _.sortBy(messages, mes=>{
            return mes.time;
        })
    }
    sliceLastMessages = (messages) => {
        let temp = messages.reverse().slice(0,10);
        return temp.reverse();
    }

    renderMessages = (messages,friend) =>{
        let tempMsg = [];
        if(messages.sent && messages.receive){
            if(friend){
                let {sent,receive} = messages;
                let fmessages = [...sent,...receive];
                tempMsg = fmessages.filter(msg =>{
                    if(msg.from){
                        return msg.from === friend.uid;
                    }
                    if(msg.to){
                        return msg.to === friend.uid;
                    }
                })
            }
        }
        
        let sorted = this.sortMessageByTime(tempMsg);
        sorted = this.sliceLastMessages(sorted);
        return sorted;
    }

    render(){
        return(
            <div 
             className="d-flex flex-column align-items-end"
             >
                <MessageItem 
                    theme = {this.props.theme}
                    messages = {this.renderMessages(this.props.messages, this.props.chat)} 
                />
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        chat:state.message.chat_friend,
        messages:state.message,
    }
}
export default connect(mapStateToProps)(MessageList);