import React from 'react';
import {connect} from 'react-redux';
import {Modal,Button} from 'antd';
import {addMemberToGroups} from '../../redux/actions';
import _ from 'lodash';

class AddGroupMemberModal extends React.Component {

    removeAlredyMembers = (friends,members) => {
    let tmp = [...friends];
         for(let i = 0;i<friends.length;i++){
             members.map(mem =>{
                 if(mem.uid === friends[i].uid){
                    tmp.splice(i,1);
                 }
             })
        }
        return tmp;
     }
    
    onAddFriend = (friend,group ) =>{
        this.props.addMemberToGroups(group,friend);
        this.props.onCancel();
    }

    renderFriends = (friends,group) =>{
        let Ffriends;
        if(group){
            Ffriends =  this.removeAlredyMembers(friends,group.members);
        }
        return Ffriends.map(friend =>{
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


const mapStateToProps = state =>{
    return {
        authUser:state.authUser.user.data,
    }
}
export default connect(mapStateToProps,{
    addMemberToGroups
})(AddGroupMemberModal);