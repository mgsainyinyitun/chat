import React from 'react';
import {connect} from 'react-redux';
import {Modal,Form,Input,Button} from 'antd';

import {createNewGroup} from '../../../../redux/actions';

class NewGroupModal extends React.Component {
    onFinishAddGroup = values => {
        if(values.groupName){
            let uD = {
                uid:this.props.authUser.uid,
                username:this.props.authUser.username,
                email:this.props.authUser.email,
            }
            let newG = {
                name:values.groupName,
                created:new Date(),
                createdBy:this.props.authUser,
                active:true,
                members:[uD],
            }
            this.props.createNewGroup(newG);
            this.props.onCancel();
        }
    }
    render () {
        return(
            <Modal
                title={<h3 className="text-primary">CREATE NEW GROUP</h3>}
                visible = {this.props.visible}
                onCancel = {this.props.onCancel}
                footer={null}

            >
                <Form
                    name="newGroup"
                    onFinish={this.onFinishAddGroup}
                >
                    <Form.Item 
                        name="groupName"
                    >
                        <Input placeholder="Group Name" type="text"/>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                        Create
                        </Button>
                    </Form.Item>
                    
                </Form>
                


            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
        authUser:state.authUser.user.data
    }
}

export default connect(mapStateToProps,{
    createNewGroup,
})(NewGroupModal);