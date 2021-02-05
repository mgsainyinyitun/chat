import React from 'react';
import {Modal,Form,Input,Button,List} from 'antd';
import {connect} from 'react-redux';
import {fetchUserByEmail} from '../../../../redux/actions';
class AddFriendModal extends React.Component {

    onFinishSearch = (values) =>{
        console.log(values.searchEmail);
        this.props.fetchUserByEmail(values.searchEmail);
    }
    componentDidUpdate = () =>{
        console.log("STATE IS::",this.props);
    }

    render(){
        const friend = this.props.find_friend;
        console.log('friends is:',friend);
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
                          <Button>ADD</Button>
                        </List.Item>
                      )}
                />
                
            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
        find_friend:state.friend.friend_search
    };
}

export default connect(mapStateToProps,{fetchUserByEmail})(AddFriendModal);