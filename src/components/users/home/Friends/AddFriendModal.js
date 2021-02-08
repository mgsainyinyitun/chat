import React from 'react';
import {Modal,Form,Input,Button,List} from 'antd';
import {connect} from 'react-redux';
import {fetchUserByEmail,addFriend} from '../../../../redux/actions';
class AddFriendModal extends React.Component {

    onFinishSearch = (values) =>{
        console.log(values.searchEmail);
        this.props.fetchUserByEmail(values.searchEmail);
    }

    onAddFriend = () => {
        const {find_friend} = this.props;
        console.log("docId",find_friend[0].docId);
        console.log("Friend",find_friend[0]);
        find_friend[0].status = "pending";
        this.props.addFriend(find_friend[0],find_friend[0].docId);

    }
    componentDidUpdate = () =>{
        console.log("STATE IS::",this.props);
    }

    render(){
        const friend = this.props.find_friend;
        return(
            <Modal
                title={<h3 className="text-primary">ADD FRIEND</h3>}
                visible={this.props.visible}
                onCancel ={this.props.onCancel}
            >
                <Form
                    name="addfriend"
                    onFinish={this.onFinishSearch}
                    className="d-flex justify-content-between"
                >
                    <Form.Item
                        name="searchEmail"
                        style={{width:"75%"}}
                    >
                        <Input placeholder="Search friend by email" type="email"/>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                        Search
                        </Button>
                    </Form.Item>
                </Form>
                <List
                    dataSource={friend}
                    renderItem={item => (
                        <List.Item>
                          <span className="text-primary">Username | {item.username}</span>
                          <Button onClick={this.onAddFriend}>ADD</Button>
                        </List.Item>
                      )}
                />
                
            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
        find_friend:state.friend.friend_search,
        userId:state.authUser.uid,
        allstate:state,
    };
}

export default connect(mapStateToProps,{fetchUserByEmail,addFriend})(AddFriendModal);