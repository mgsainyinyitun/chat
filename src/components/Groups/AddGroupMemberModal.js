import React from 'react';
import {connect} from 'react-redux';
import {Modal,Button} from 'antd';
import {addMemberToGroups} from '../../redux/actions';

class AddGroupMemberModal extends React.Component {

    removeAlredyMembers = (friends,group) => {
        console.log("Friends",friends);
        console.log("Group",group);
    }
    
    onAddFriend = (friend,group ) =>{
        console.log("Friend",friend);
        console.log("Group",group);
        this.props.addMemberToGroups(group,friend.uid);
    }

    renderFriends = (friends,group) =>{
        this.removeAlredyMembers(friends,group);
        return friends.map(friend =>{
            return(
                <p key={friend.uid}>
                    <span>{friend.username}</span>
                    <span style={{float:'right'}}>
                        <Button
                            onClick={()=> this.onAddFriend(friend,group)}
                        >
                          ADD
                        </Button>
                    </span>
                </p>
            )
        })
    }
    
    render(){
        return(
            <Modal
                title={'ADD FRIEND'}
                visible={this.props.visible}
                onCancel = {this.props.onCancel}
            >
                {this.renderFriends(this.props.friends,this.props.group)}

            </Modal>

        )
    }
}
export default connect(null,{
    addMemberToGroups
})(AddGroupMemberModal);