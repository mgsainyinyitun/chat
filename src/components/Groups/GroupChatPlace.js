import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import {getUserInfoByUid} from '../../redux/actions';
import { Dropdown,Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuOutlined } from '@ant-design/icons';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import AddGroupMemberModal from './AddGroupMemberModal';
import GroupMessagesList from './GroupMessagesList';
import './GroupMessage.css';


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


    renderMembersList = (group,Tstyle) =>{
         if(group){
            console.log("memeberlist",group.members);
            return group.members.map(member =>{
                return(
                    <Menu.Item key={member.uid}>
                        <span style={{color:Tstyle}}>
                            <FontAwesomeIcon icon={faUser} style={{marginRight:5}} />
                            {member.username}
                        </span>
                    </Menu.Item>
                )
            })
         }
     }

     renderMenuItems = (group) => {
        const style = this.props.state.theme === 'dark'?'bg-dark text-white':'bg-light';
        const Tstyle = this.props.state.theme === 'dark'?'white':'';
         return(
             <Menu className={`${style}`}>
                 <Menu.Item style={{padding:0,margin:0}}>
                     <span style={{color:'white'}}>
                    ----------------------------------------------------
                    </span>
                 </Menu.Item>
                 <Menu.Item onClick={()=>this.setState({addFriendModalVisible:true})}>
                    <span style={{color:Tstyle}}>
                    <FontAwesomeIcon icon={faPlus} style={{marginRight:5}} />
                        Add Friend
                    </span>
                 </Menu.Item>
                 
                 <hr/>
                 <Menu.Item>
                   <span className="text-primary">MEMBERS</span> 
                 </Menu.Item>
                 {this.renderMembersList(group,Tstyle)}
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
                        <MenuOutlined style={{color:`${txtColor}`}}/>
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
            <Card className={`p-3 ${style} messages-container`}>
                <Card.Title>
                   {this.renderHeader(this.props.group,txtColor)}
                </Card.Title>
                <Card.Body style={{padding:0}}>
                    <GroupMessagesList/>
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
export default connect(mapStateToProps,{
    getUserInfoByUid
})(GroupChatPlace);