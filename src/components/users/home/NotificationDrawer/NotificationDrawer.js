import React from 'react';
import { connect } from "react-redux";
import {Drawer,Button} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import {addFriend,removeFriendRequest,editFriendsData} from '../../../../redux/actions';

class NotificationDrawer extends React.Component{
    onFriendAccept = (friend) =>{
        friend.status = "friend";
        this.props.addFriend(friend,this.props.authUser,'ACCEPT');
        this.props.removeFriendRequest(friend,this.props.authUser);
        this.props.editFriendsData(friend,this.props.authUser);
    }

    renderFriendsReqNoti = (requests) =>{
        return requests.map((req) =>{
            return (
                <p>
                    <span 
                        className="text-primary"
                        style={{marginRight:5,fontSize:"1.5em"}}
                    >
                        <FontAwesomeIcon icon={faUserCheck} style={{marginRight:5}}/>
                        {req.username}
                    </span>
                        just send you friend request
                    <Button 
                        style={{marginLeft:5}}
                        onClick={()=>this.onFriendAccept(req)}
                    >Accept</Button>
                </p>
            )
        })

    }
    render(){
        const Dstyle = this.props.theme === 'dark'?
        {
            background:'teal',color:'white',
        }:
        {
            background:'white',color:'black',
        }
        const Htstyle = this.props.theme === 'dark'?'white':'';
        const Hstyle = this.props.theme === 'dark'?'blue':'white';
        return(
            <Drawer
                    title={<p style={{color:`${Htstyle}`}}>Notification</p>}
                    placement= "right"
                    closable={true}
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                    key="noti"
                    drawerStyle={Dstyle}
                    headerStyle={{background:Hstyle}}
            >
                {this.renderFriendsReqNoti(this.props.friend.friends_request)}
            </Drawer>
          )

    }
}
const mapStateToProps = state =>{
    return {
        ...state,
        authUser:state.authUser.user.data
    };
}
export default connect(mapStateToProps,
    {addFriend,removeFriendRequest,editFriendsData})(NotificationDrawer);