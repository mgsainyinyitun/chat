import React from 'react';
import {connect} from 'react-redux';
import GroupChatPlace from './GroupChatPlace';

class GroupChat extends React.Component {

    render(){
        const style = this.props.theme === 'dark'?'bg-secondary':'bg-light';
        return(
            <div className={`p-2 h-100 ${style}`} >
                <GroupChatPlace
                    group = {this.props.groups.currentGroup}
                />
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return state;
}

export default connect(mapStateToProps)(GroupChat);