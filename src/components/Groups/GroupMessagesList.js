import React from 'react';
import {connect} from 'react-redux';
import GroupMessagesItem from './GroupMessagesItem';
import _ from 'lodash';

class GroupMessagesList extends React.Component {


    sortMessagesByTime = (messages) => {
        return _.sortBy(messages,mes => {
            return mes.time;
        })
    }

    sliceLastMessages = (messages) => {
        let temp = messages.reverse().slice(0,7);
        return temp.reverse();
    }

    filterCurrentGroupMsg = (group,messages) => {
        return messages.filter(message => {
            return message.groupId === group.groupId;
        })
    }

    getGroupMessage = (group,messages) => {
        let gmsg = [];
        if(group){
            gmsg =  this.filterCurrentGroupMsg(group,messages);
        }
        gmsg = this.sortMessagesByTime(gmsg);
        //gmsg = this.sliceLastMessages(gmsg);
        return gmsg.reverse();
    }

    render(){
        let msg = this.getGroupMessage(
            this.props.group,
            this.props.messages,
        )
        return(
            <div className="d-flex flex-column-reverse"
            style={{overflowY:'scroll',height:'65vh'}}
            >
                <GroupMessagesItem
                    messages = {msg}
                    theme = {this.props.theme}
                    user={this.props.user}
                />
            </div>
        )
        
    }
}
const mapStateToProps = state => {
    return {
        group:state.groups.currentGroup,
        messages:state.groups.groupMessages,
        theme:state.theme,
        user:state.authUser.user.data,
    }
}

export default connect(mapStateToProps)(GroupMessagesList);