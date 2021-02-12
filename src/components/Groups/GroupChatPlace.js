import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import { Dropdown,Menu,Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuOutlined } from '@ant-design/icons';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import AddGroupMemberModal from './AddGroupMemberModal';


class GroupChatPlace extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addFriendModalVisible:false,
        }
    }

    componentDidUpdate(){
        console.log("GRREEFDF:",this.props);
    }


     renderMembersList = (group) =>{
         if(group){
            console.log("memeberlist",group.members);
            return group.members.map(member =>{
                return(
                    <Menu.Item key={member}>
                        <FontAwesomeIcon icon={faUser} style={{marginRight:5}} />
                        {member}
                    </Menu.Item>
                )
            })
         }
         
     }

     renderMenuItems = (group) => {
         return(
             <Menu>
                 <Menu.Item style={{padding:0,margin:0}}>
                     <span style={{color:'white'}}>
                    ----------------------------------------------------
                    </span>
                 </Menu.Item>
                 <Menu.Item onClick={()=>this.setState({addFriendModalVisible:true})}>
                    <FontAwesomeIcon icon={faPlus} style={{marginRight:5}} />
                        Add Friend
                 </Menu.Item>
                 <hr/>
                 <Menu.Item>
                   <span className="text-primary">MEMBERS</span> 
                 </Menu.Item>
                 {this.renderMembersList(group)}
             </Menu>
        )
    }

    renderHeader = (group,txtColor) =>{
        return(
            <div>
                 <div className="d-flex justify-content-between align-items-center">
                    <p style={{color:`${txtColor}`}}>
                        {group?group.name:null}
                    </p>

                    <Dropdown
                        overlay={this.renderMenuItems(group)} 
                        trigger={['click']}>
                        <MenuOutlined style={{color:'white'}}/>
                    </Dropdown>
                    
                </div>
            <hr/>
            </div>
        )
    }
    
    render(){
        const style = this.props.state.theme === 'dark'?'bg-dark':'bg-light';
        const txtColor = this.props.state.theme === 'dark'?'white':'teal';
        return(
            <>
            <Card
                className={`p-3 ${style}`}
                style={{height:"90%"}}
            >
                <Card.Title>
                   {this.renderHeader(this.props.group,txtColor)}
                </Card.Title>
                <Card.Body>
 
                </Card.Body>
            </Card>
            <AddGroupMemberModal 
                visible = {this.state.addFriendModalVisible}
                onCancel = {()=>this.setState({addFriendModalVisible:false})}
                friends = {this.props.friends}
                group = {this.props.group}
            />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state,
        authUser:state.authUser.user.data,
        friends:state.friend.friends_list,
    };
}
export default connect(mapStateToProps)(GroupChatPlace);