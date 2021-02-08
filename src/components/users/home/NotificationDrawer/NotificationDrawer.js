import React from 'react';
import { connect } from "react-redux";
import {Drawer,Button} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import {addFriend} from '../../../../redux/actions';

class NotificationDrawer extends React.Component{

    componentDidUpdate = () =>{
        console.log("Drawer",this.props);

    }
    onFriendAccept = (friend) =>{
        friend.status = "friend";
        console.log("Accept Friend",friend);
        //this.props.addFriend(friend,this.props.authUser.user.data);
    }

    renderFriendsReqNoti = (requests) =>{
        console.log("request List",requests);
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
        return(
            <Drawer
                    title="Notifications"
                    placement= "right"
                    closable={true}
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                    key="noti"
            >
                {this.renderFriendsReqNoti(this.props.friend.friends_request)}
    
            </Drawer>
          )

    }
}
const mapStateToProps = state =>{
    return state;
}
export default connect(mapStateToProps,{addFriend})(NotificationDrawer);